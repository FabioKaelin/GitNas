import codecs
import os
import paramiko
from dotenv import load_dotenv
import time

load_dotenv()

outputFile = "C:\\Users\\super\\fabiokaelin\\lehre\\Projekte\\GitNas\\output.txt"
folder = "C:\\Users\\super\\fabiokaelin\\lehre\\Projekte\\GitNas\\repos"
repositories = []

router_ip = os.getenv('ROUTER_IP')
router_username = os.getenv('ROUTER_USERNAME')
router_password = os.getenv('ROUTER_PASSWORD')

class Repository:
    def __init__(self, name):
        self.name = name
        self.path = os.path.join(folder, name+".git")
        self.commits = []
        self.description = execSSH("cd " + self.name + ".git; cat description")[0]

    def load(self):
        RemoteRepos = execSSH("ls")
        localRepos = execCommandInFolder("dir /a /B").split("\n")[:-1]
        self.description = execSSH("cd " + self.name + ".git; cat description")[0]
        if self.name in localRepos:
            execCommandInRepo(self.name, "git pull")
        else:
            execCommandInFolder("git clone " + getClone(self.name))

    def loadCommits(self):
        self.commits=[]
        content = execCommandInRepo(self.name, "git log --format=oneline").split("\n")[:-1]
        for commit in content:
            commitList = commit.split(" ", 1)
            commit = Commit()
            commit.hash = commitList[0]
            commit.message = commitList[1]
            self.commits.append(commit)

    def getClone(self):
        return getClone(self.name)

    def setDescription(self, description):
        execSSH("echo '" + description + "' > " + self.name + ".git/description")
        self.description = description

    def __repr__(self):
        return '<Repo name='+self.name+'>'

class Commit:
    def __init__(self):
        self.hash = ""
        self.message = ""
        self.date = ""
    def __repr__(self):
        return '<Commit message='+ self.message+'>'


def execCommandInFolder(command):
    os.system('cd "' + folder.replace("/", "\\") + '"' + " & "+ command +" > " + outputFile + " &")
    with open(outputFile, 'r', encoding='UTF-8') as file:
        content = file.read()
    return content

def execCommandInRepo(repo, command):
    os.system('cd "' + folder.replace("/", "\\") + '\\' + repo + '"' + " & "+ command + "> " + outputFile + " &")
    # execCommandInFolder(command+" > " + outputFile)
    with open(outputFile, 'r', encoding='UTF-8') as file:
        content = file.read()
    return content

def execSSH(command):
    ssh = paramiko.SSHClient()

    ssh.load_system_host_keys()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(router_ip,
                username=router_username,
                password=router_password,
                look_for_keys=False)

    ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command("cd /;cd volume1/GitNas/repository; " + command)
    output = []
    for line in ssh_stdout.readlines():
        output.append(line.replace("\n", ""))
    return output

def getClone(name):
    return "ssh://"+router_username+"@"+router_ip+":/volume1/GitNas/repository/" + name

def updateClone():
    RemoteRepos = execSSH("ls")
    localRepos = execCommandInFolder("dir /a /B").split("\n")[:-1]
    for repo in RemoteRepos:
        newRepo = Repository(repo.replace(".git", ""))
        if repo.replace(".git", "") in localRepos:
            execCommandInRepo(repo.replace(".git",""), "git pull")
        else:
            execCommandInFolder("git clone " + getClone(repo))

        newRepo.loadCommits()
        repositories.append(newRepo)

def loadRepositories():
    global repositories
    repositories = []
    print("vor ls")
    RemoteRepos = execSSH("ls")
    print("nach ls")
    print(RemoteRepos)
    for repo in RemoteRepos:
        repositories.append(Repository(repo.replace(".git", "")))
    print("loadRepositories returned")
    return repositories

def getStructure(repo, path=""):
    position = [repo, path]
    positionString = os.path.join(folder, position[0], position[1])
    content = os.listdir(positionString)
    structure = []
    for file in content:
        if (file != ".git"):
            structure.append([file, os.path.isdir(os.path.join(folder, position[0], position[1], file))])
    return structure

def getFile(repo, path=""):
    position = [repo, path]
    positionString = os.path.join(folder, position[0], position[1])
    with open(positionString, 'r', encoding='UTF-8') as file:
        content = file.read()
    extensionName = path.split(".")[-1:][0]
    return [content, extensionName]

def replaceTags(text):
    text = text.replace("<", "&lt;")
    text = text.replace(">", "&gt;")
    return text
