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
def setPosition(repo, path=""):
    global position
    position = [repo, path]

@eel.expose
def print1(input):
    print(input)

@eel.expose
def getStructureEEL():
    cloneRepos.join()
    structure = getStructure(position[0], position[1])
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
        structurejs.append(elementjs)
    eel.displayStructure(structurejs)


@eel.expose
def loadRepositoriesFunc():
    repositoriesJs = []
    print(repositories)
    for element in repositories:
        repositoriesJs.append({"name": element.name, "description": element.description})
    eel.displayRepositories(repositoriesJs)
    # return repositoriesJs

eel.start('repos.html', port=9898, size=(800,600))