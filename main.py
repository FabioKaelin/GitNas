import eel
from functions import *
import os

eel.init('web')
position = ["", ""]
# @eel.expose
# def allBranches():
#     # eel.allBranches(updateBranch())
#     return "test"

@eel.expose
def updateDescription(name, description):
    for repo in repositories:
        if repo.name == name:
            repo.setDescription(description)
            break

@eel.expose
def setPosition(repo, path="", iffolder=True):
    global position
    print(path)

    if path[0:1] == "/":
        position = [repo, path[1:]]
    else:
        position = [repo, path]
    if not iffolder:
        print("location editor")
        eel.setLocation("editor.html")
    else:
        eel.setLocation("explorer.html")
    print("repo:'"+repo + "' path:'" + path + "' iffolder:'" + str(iffolder) + "'")


@eel.expose
def print1(input):
    print(input)

@eel.expose
def getStructureEEL():
    cloneRepos.join()
    structure = getStructure(position[0], position[1])
    # structure = getStructure(position[0], position[1])
    structurejs = []
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
        structurejs.append(elementjs)
    eel.displayStructure([ position, structurejs])


@eel.expose
def eelGetPath():
    print(position)
    return [position[0], position[1]]

@eel.expose
def loadRepositoriesFunc():
    repositoriesJs = []
    print(repositories)
    for element in repositories:
        repositoriesJs.append({"name": element.name, "description": element.description})
    eel.displayRepositories(repositoriesJs)
    # return repositoriesJs

eel.start('repos.html', port=9898, size=(800,600))