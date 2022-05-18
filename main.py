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
    print(name)
    print(description)

    for repo in loadRepositories():
        print(repo.name)
        if repo.name == name:
            print(repo.name)
            repo.setDescription(description)
            break

@eel.expose
def loadRepositoriesFunc():
    repositoriesJs = []
    for element in loadRepositories():
        repositoriesJs.append({"name": element.name, "description": element.description})
    eel.displayRepositories(repositoriesJs)
    # return repositoriesJs

eel.start('repos.html', port=9898)