import eel
from functions import *
import os

eel.init('web')
position = ["", "", 0]
# @eel.expose
# def allBranches():
#     # eel.allBranches(updateBranch())
#     return "test"

@eel.expose
def getCommits():
    repoName = position[0]
    for repo in repositories:
        if repo.name == repoName:
            repo.loadCommits()
            commits = repo.commits
            commitsJS = []
            for commit in commits:
                commitsJS.append([commit.message, commit.hash, commit.date.strftime("%H:%M:%S %d.%m.%Y")])
            return commitsJS

@eel.expose
def updateDescription(name, description):
    for repo in repositories:
        if repo.name == name:
            repo.setDescription(description)
            break

@eel.expose
def getRepoNames():
    RemoteRepos = execSSH("ls")
    repositories1 = []
    for repo in RemoteRepos:
        repositories1.append(repo.replace(".git", "").lower())
    return repositories1

@eel.expose
def changeBranch(branch):
    execCommandInRepoOhne(position[0], "git checkout "+ branch)
    repositories[position[2]].load()
    return "a"

@eel.expose
def createRepo(name, beschreibung):
    print(name, beschreibung)
    execSSH("git init --bare "+ name + ".git")
    execSSH("echo '" + beschreibung + "' > " + name + ".git/description")
    global repositories
    repositories = []
    repositories = loadRepositories()
    cloneRepos = Thread(target=updateClone)
    cloneRepos.start()
    cloneRepos.join()
    return

@eel.expose
def setPosition(repo, path="", iffolder=True):
    global position
    print("Position: "+ str(repo)+"/"+ str(path))
    oldRepo = position[0]

    if path[0:1] == "/":
        position = [repo, path[1:], position[2]]
    else:
        position = [repo, path, position[2]]


    output = execCommandInRepo(repo, "dir /a /B")
    if len(output.split("\n")[:-1]) == 1:

        eel.setLocation("emptyRepo.html")
    elif not iffolder:
        eel.setLocation("editor.html")
    else:
        eel.setLocation("explorer.html")

    if oldRepo != position[0]:
        for index, repo1 in enumerate(repositories):
            if repo1.name == position[0]:
                position[2] = index
        repo1 = repositories[position[2]]
        loadRepo = Thread(target=repo1.load())
        loadRepo.start()

@eel.expose
def print1(input):
    print(input)

@eel.expose
def getCloneEEL():
    global position
    reponame = position[0]
    url = getClone(reponame)
    cloneUrl = "git clone " + url
    remoteUrl = "git remote add nas "+ url
    pushCommand = "git push -u nas main"
    jsonObject = {
        "Url": url,
        "Clone": cloneUrl,
        "Remote": remoteUrl,
        "Push": pushCommand
        }
    return jsonObject

@eel.expose
def getStructureEEL():
    cloneRepos.join()
    structure = getStructure(position[0], position[1])

    repo = repositories[position[2]]
    # repo.load()
    eel.displaybranches([repo.branches, repo.currentBranch])


    # structure = getStructure(position[0], position[1])
    structurejs = []
    folderJs = []
    fileJs = []
    for element in structure:
        elementjs = []
        filename = element[0]
        elementjs.append(filename)
        if element[1]:
            elementjs.append("folder.svg")
        else:
            extensionName = element[0].split(".")[-1:][0]

            if (extensionName in icons):
                elementjs.append(icons[extensionName] + ".svg")
            else:
                elementjs.append("file" + ".svg")
        elementjs.append(element[1])
        if element[1]:
            folderJs.append(elementjs)
        else:
            fileJs.append(elementjs)

    for element in folderJs:
        structurejs.append(element)

    for element in fileJs:
        structurejs.append(element)
    eel.displayStructure([ position, structurejs])

@eel.expose
def getFileEEL():
    global position
    input = getFile(position[0], position[1])
    if input:
        positionString = os.path.join(folder, position[0], position[1])
        extensionName = position[1].split(".")[-1:][0]
        size = os.path.getsize(positionString)
        sizeString = ""
        if (size < 1024):
            sizeString = str(round(size, 2))+" B"
        else:
            size = size / 1024
            if (size < 1024):
                sizeString = str(round(size, 2))+" KB"
            else:
                size = size / 1024
                if (size < 1024):
                    sizeString = str(round(size, 2))+" MB"
                else:
                    size = size / 1024
                    sizeString = str(round(size, 2))+" GB"
        if extensionName in imageTypes:
            content = "<img id='FileImage'  src='./repos"+ positionString.replace(folder, "").replace("\\", "/") +"' alt='Image'>"
        else:
            content = "Dieses Dateiformat ("+ extensionName+") wird nicht unterstützt"
        return [content, extensionName, "Uncountable", sizeString, "img"]
    else:
        text = replaceTags(input[0])
        return [text, input[1], input[2], input[3], "text"]

@eel.expose
def eelGetPath():
    return [position[0], position[1]]

@eel.expose
def loadRepositoriesFunc():
    repositoriesJs = []
    print(repositories)
    for element in repositories:
        repositoriesJs.append({"name": element.name, "description": element.description})
    eel.displayRepositories(repositoriesJs)
    # return repositoriesJs

eel.start('repos.html', port=9898, size=(1000,800))

