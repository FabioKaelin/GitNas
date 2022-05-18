import eel
from functions import *
import os

eel.init('web')

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
def getStructureEEL(repo, path=""):
    # updateClone
    cloneRepos.join()
    structure = getStructure(repo, path)
    # print(structure)
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
    print(structurejs)
    time.sleep(0.03)
    eel.displayStructure(structurejs)


@eel.expose
def loadRepositoriesFunc():
    repositoriesJs = []
    print("------")
    print(repositories)
    print(repositoriesJs)
    print("---------")
    for element in repositories:
        repositoriesJs.append({"name": element.name, "description": element.description})
    eel.displayRepositories(repositoriesJs)
    # return repositoriesJs

eel.start('repos.html', port=9898)