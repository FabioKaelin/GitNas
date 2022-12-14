import PIL
import eel
import markdown
from PIL import Image
from tkinter import filedialog
import tkinter as tk
import random
import os
from functions import *

eel.init(os.path.join(__file__, "..", 'web'), allowed_extensions=[".js", ".html", ".css", ".png", ".jpeg", ".gif", ".jpg", ".svg", ".pdf"])

position = ["", "", 0]
location = ""


@eel.expose
def getCommits():
    repositories[position[2]]
    repositories[position[2]].loadCommits()
    commits = repositories[position[2]].commits
    commitsJS = []
    for commit in commits:
        commitsJS.append([commit.message, commit.hash,
                         commit.date.strftime("%H:%M:%S %d.%m.%Y")])
    return commitsJS


@eel.expose
def getTags():
    repoName = position[0]
    tags = execCommandInRepo(repoName, "git tag").split("\n")
    if tags[0] == "":
        return "false"
    tags.reverse()
    return tags


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
    execCommandInRepoOhne(position[0], "git checkout " + branch)
    repositories[position[2]].load()
    return "a"


@eel.expose
def openSettings(location1, reponame="errk4j2ej2{[)(86*+snh4ek.-823hbndleor12353"):
    global position
    global location
    location = location1
    if reponame != "errk4j2ej2{[)(86*+snh4ek.-823hbndleor12353":
        position = [reponame, position[1], position[2]]
    eel.setLocation("repoSettings.html")


@eel.expose
def backofSettings():
    global location
    eel.setLocation(location)


@eel.expose
def getUpdateFill():
    for repo in repositories:
        if repo.name == position[0]:
            return [position[0], repo.description]


@eel.expose
def updateRepo(description, icon):
    reponame = position[0]
    if icon != "default":
        print(reponame, icon)
        setIcon(reponame, icon)
        loadIconsThread = Thread(target=loadIcons)
        loadIconsThread.start()
    for repo in repositories:
        if repo.name == reponame:
            repo.setDescription(description)
    loadRepositories()
    global location
    eel.setLocation(location)


@eel.expose
def createRepo(name, beschreibung, path):
    execSSH("git init --bare " + name + ".git")
    execSSH("echo '" + beschreibung + "' > " + name + ".git/description")
    global repositories
    repositories = loadRepositories()
    cloneRepos = Thread(target=updateClone)
    cloneRepos.start()
    loadIconsThread = Thread(target=loadIcons)
    loadIconsThread.start()
    if path == "empty":
        img = Image.new('RGB', (200, 200), (random.randint(
            40, 200), random.randint(40, 200), random.randint(40, 200)))
        img.save(os.path.join(folder, "..", "..", "RepoImg.png"))
        path = os.path.join(folder, "..", "..", "RepoImg.png")
    setIconThread = Thread(target=setIcon, args=(name, path,))
    setIconThread.start()
    cloneRepos.join()
    return


@eel.expose
def generateImage():
    img = Image.new('RGB', (200, 200), (random.randint(40, 200),
                    random.randint(40, 200), random.randint(40, 200)))
    img.save(os.path.join(folder, "..", "RepoImg.png"))
    path = os.path.join(folder, "..", "RepoImg.png")
    return "./RepoImg.png"


@eel.expose
def askImage():
    filetypes = (
        ('images', '*.png'),
        ('images', '*.jpeg')
    )
    root = tk.Tk()
    root.withdraw()
    file_path = filedialog.askopenfilename(filetypes=filetypes, parent=root)
    root.destroy()
    if file_path == "":
        return "./images/repoIcons/" + position[0] + ".png"

    filename = file_path.split("/")[-1].split("\\")[-1]

    width, height = PIL.Image.open(file_path).size
    if width > height:
        im = Image.open(file_path)
        im_crop = im.crop((0, 0, height, height))
        im_crop.save(os.path.join(folder, "..", filename), quality=95)
    else:
        im = Image.open(file_path)
        im_crop = im.crop((0, 0, width, width))
        im_crop.save(os.path.join(folder, "..", filename), quality=95)

    return "./"+filename


@eel.expose
def setPosition(repo, path="", iffolder=True):
    global position
    print("Position: " + str(repo)+"/" + str(path))
    oldRepo = position[0]

    if path[0:1] == "/":
        position = [repo, path[1:], position[2]]
    else:
        position = [repo, path, position[2]]

    output = execCommandInRepo(repo, "dir /a /B")
    if len(output.split("\n")) == 1:
        eel.setLocation("emptyRepo.html")
    elif not os.path.isdir(os.path.join(folder, repo, position[1])):
        eel.setLocation("editor.html")
    else:
        eel.setLocation("explorer.html")

    if oldRepo != position[0]:
        for index, repo1 in enumerate(repositories):
            if repo1.name == position[0]:
                position[2] = index
        loadRepo = Thread(target=repositories[position[2]].load())
        loadRepo.start()


@eel.expose
def getReadme():
    global position
    positionString = os.path.join(folder, position[0])
    content = os.listdir(positionString)
    if "README.md" not in content:
        return "false"
    positionString = os.path.join(folder, position[0], "README.md")

    with open(positionString, 'r', encoding='UTF-8') as file:
        content = file.read()
        content = content.replace("](./", "](./repos/" + position[0] + "/")
    content = markdown.markdown(content)
    return content


@eel.expose
def print1(input):
    print(input)


@eel.expose
def getCloneEEL():
    global position
    reponame = position[0]
    url = getClone(reponame)
    cloneUrl = "git clone " + url
    remoteUrl = "git remote add nas " + url
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
    eel.displaybranches([repo.branches, repo.currentBranch])

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
    eel.displayStructure([position, structurejs])


@eel.expose
def getFileEEL():
    global position
    input = getFile(position[0], position[1])
    if input == True:
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
            content = "<img id='FileImage' width='100%' src='./repos" + \
                positionString.replace(folder, "").replace(
                    "\\", "/") + "' alt='Image'>"
        else:
            content = "Dieses Dateiformat (" + \
                extensionName+") wird nicht unterst??tzt"
        return [content, extensionName, "Uncountable", sizeString, "img"]
    else:
        text = replaceTags(input[0])
        return [text, input[1], input[2], input[3], "text"]


@eel.expose
def eelDownloadZip():
    DownloadZIP(position[0])


@eel.expose
def eelGetPath():
    return [position[0], position[1]]


@eel.expose
def loadRepositoriesFunc():
    repositoriesJs = []
    global repositories
    if len(repositories) == 0:
        repositories = loadRepositoriesThread.join()

    print(repositories)
    for element in repositories:
        repositoriesJs.append(
            {"name": element.name, "description": element.description})
    global position
    position = ["", "", 0]
    eel.displayRepositories(repositoriesJs)


@eel.expose
def startLoading():
    global repositories
    repositories = loadRepositoriesThread.join()
    eel.setLocation("repos.html")


eel.start('load.html', port=8085, size=(1000, 800))
