import codecs
import datetime
import os
import zipfile
import subprocess
import paramiko
from dotenv import load_dotenv
import time
from threading import Thread


load_dotenv()

icons = {
    "py": "python",
    "gitignore": "git",
    "git": "git",
    "pyw": "python",
    "md": "markdown",
    "svg": "svg",
    "html": "html",
    "env": "env",
    "js": "js",
    "png": "image",
    "jpeg": "image",
    "gif": "image",
    "pdn": "image",
    "css": "css",
    "scss": "scss",
    "sass": "scss",
    "pdf": "pdf",
    "php": "php",
    "jar": "jar",
    "java": "java",
    "go": "go",
    "json": "json",
    "csv": "csv",
    "xlsx": "csv",
    "database": "database",
    "docker": "docker",
    "log": "log",
    "yml": "yml",
    "yaml": "yml",
    "xml": "xml",
    "zip": "zip",
    "7z": "zip",
    "rar": "zip",
    "doc": "word",
    "docx": "word",
    "vue": "vue",
    "jsx": "react"
}

imageTypes = ["png", "jpng", "gif"]
binTypes = ["docx", "xlsx", "ppx"]

# outputFile = "C:\\Users\\super\\fabiokaelin\\lehre\\Projekte\\GitNas\\output.txt"
# folder = "C:\\Users\\super\\fabiokaelin\\lehre\\Projekte\\GitNas\\repos"
outputFile = os.path.join(__file__, "..", "output.txt")
folder = os.path.join(__file__, "..","web", "repos")
repositories = []


router_ip = os.getenv('ROUTER_IP')
router_username = os.getenv('ROUTER_USERNAME')
router_password = os.getenv('ROUTER_PASSWORD')


class ThreadWithReturnValue(Thread):
    def __init__(self, group=None, target=None, name=None,
                 args=(), kwargs={}, Verbose=None):
        Thread.__init__(self, group, target, name, args, kwargs)
        self._return = None
    def run(self):
        if self._target is not None:
            self._return = self._target(*self._args,
                                                **self._kwargs)
    def join(self, *args):
        Thread.join(self, *args)
        return self._return

class Repository:
    def __init__(self, name):
        self.name = name
        loadDescriptionThread = Thread(target=self.loadDescription)
        loadDescriptionThread.start()
        self.path = os.path.join(folder, name+".git")
        self.commits = []

    def loadDescription(self):
        self.description = execSSH("cd " + self.name + ".git; cat description")[0]

    def load(self):
        localRepos = execCommandInFolder("dir /a /B").split("\n")[:-1]
        self.description = execSSH("cd " + self.name + ".git; cat description")[0]
        if self.name in localRepos:
            execCommandInRepoOhne(self.name, "git restore .")
            execCommandInRepoOhne(self.name, "git pull")
        else:
            execCommandInFolderOhne("git clone " + getClone(self.name))

        output = getBranches(self.name)
        self.branches = output[0]
        self.currentBranch = output[1]

    def loadCommits(self):
        self.commits=[]
        content = execCommandInRepo(self.name, "git log --decorate=no --date-order --format=oneline -n 1000").split("\n")[:-1]
        for commit in content:
            commitList = commit.split(" ", 1)
            commit = Commit()
            commit.hash = commitList[0]
            commit.message = commitList[1]
            commit.loadDate(self.name)
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

    def loadDate(self, reponame):
        # f4c13460d15be5f139bd8d0c522aa39a945f7c15
        # output = subprocess.run(['git', "log", "-n", "1", "--no-decorate", self.hash], shell=True, cwd=folder+"\\"+reponame , stdout=subprocess.PIPE).stdout.decode('utf-8')[:-1].split("\n")[2].split(" ")[4:-1]
        output = subprocess.run(['git', "log", "-n", "1", "--no-decorate", self.hash], shell=True, cwd=folder+"\\"+reponame , stdout=subprocess.PIPE).stdout.decode('utf-8')[:-1].split("\n")
        if "Date" in output[2]:
            output = output[2].split(" ")[4:-1]
        else:
            output = output[3].split(" ")[4:-1]
        self.date=datetime.datetime.strptime(output[1]+" "+output[0]+" "+output[3]+", "+output[2], "%d %b %Y, %H:%M:%S")

    def __repr__(self):
        return '<Commit message='+ self.message+'>'

def execCommandInFolder(command):
    os.system('cd "' + folder.replace("/", "\\") + '"' + " & "+ command +" > " + outputFile + " 2>nul")
    with open(outputFile, 'r', encoding='UTF-8') as file:
        content = file.read()
    return content

def execCommandInRepo(repo, command):
    output = subprocess.run(command, shell=True, cwd=os.path.join(folder, repo) , stdout=subprocess.PIPE).stdout.decode('utf-8')[:-1]

    # os.system('cd "' + folder.replace("/", "\\") + '\\' + repo + '"' + " & "+ command + "> " + outputFile + " 2>nul")
    # with open(outputFile, 'r', encoding='UTF-8') as file:
        # content = file.read()
    # return content
    return output

def execCommandInFolderOhne(command):
    os.system('cd "' + folder.replace("/", "\\") + '"' + " & "+ command + " >nul 2>nul")

def execCommandInRepoOhne(repo, command):
    os.system('cd "' + folder.replace("/", "\\") + '\\' + repo + '"' + " & "+ command + " >nul 2>nul")

def execSSH(command):
    try:
        ssh = paramiko.SSHClient()

        ssh.load_system_host_keys()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(router_ip,
                    username=router_username,
                    password=router_password,
                    look_for_keys=False)

        ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command("cd /;cd volume1/GitNas/repository; " + command)
        output = [line.replace('\n', '') for line in ssh_stdout.readlines()]
        return output
    except:
        ssh = paramiko.SSHClient()

        ssh.load_system_host_keys()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(router_ip,
                    username=router_username,
                    password=router_password,
                    look_for_keys=False)

        ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command("cd /;cd volume1/GitNas/repository; " + command)
        output = [line.replace('\n', '') for line in ssh_stdout.readlines()]
        return output

def getClone(name):
    return "ssh://"+router_username+"@"+router_ip+":/volume1/GitNas/repository/" + name + ".git"

def updateCloneOne(repo, localRepos):
    global repositories
    newRepo = Repository(repo.replace(".git", ""))
    if repo.replace(".git", "") in localRepos:
        print(repo,"start")
        execCommandInRepoOhne(repo.replace(".git",""), "git restore .")
        print(repo, "mitte")
        execCommandInRepoOhne(repo.replace(".git",""), "git pull")
        print(repo,"ende")
    else:
        execCommandInFolderOhne("git clone " + getClone(repo.replace(".git","")))

    for line in execCommandInRepo(repo.replace(".git",""), "git branch -a").split("\n")[:-1]:
        if "remotes/origin/" in line[2:] and not "remotes/origin/HEAD" in line[2:]:
            execCommandInRepoOhne(repo.replace(".git",""), "git checkout " + line[2:].replace("remotes/origin/", ""))
    if "main" in execCommandInRepo(repo.replace(".git",""), "git branch -a"):
        execCommandInRepoOhne(repo.replace(".git",""), "git checkout main")
    for index,repo1 in enumerate(repositories):
        if repo1.name == repo.replace(".git", ""):
            repositories[index] = newRepo

def updateClone():
    RemoteRepos = execSSH("ls")
    localRepos = execCommandInFolder("dir /a /B").split("\n")[:-1]
    updateRepoArray = []
    for repo in RemoteRepos:
        updateCloneOne(repo,localRepos)
        # updateCloneOneThread = Thread(target=updateCloneOne, args=(repo,localRepos,))
        # updateCloneOneThread.start()
        # updateRepoArray.append(updateCloneOneThread)
    # for thread in updateRepoArray:
    #     thread.join()
    print("updateClone() finished")

def zipdir(path, ziph):
    # ziph is zipfile handle
    for root, dirs, files in os.walk(path):
        if not( "/.git" in root or "\\.git" in root):
            for file in files:
                ziph.write(os.path.join(root, file),
                        os.path.relpath(os.path.join(root, file),
                                        os.path.join(path, '..')))

def DownloadZIP(repo):
    # "C:\Users\super\Downloads\PowerToysSetup-0.58.0-x64.exe"
    from datetime import datetime
    ts = datetime.timestamp(datetime.now())
    with zipfile.ZipFile('C:\\Users\\'+str(os.getlogin())+'\\Downloads\\'+repo+ "-"+ str(ts) +".zip", 'w', zipfile.ZIP_DEFLATED) as zipf:
        zipdir(os.path.join(folder, repo), zipf)

def loadRepositories():
    global repositories
    RemoteRepos = execSSH("ls")
    repositories = []
    for repo in RemoteRepos:
        repositories.append(Repository(repo.replace(".git", "")))
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
    try:
        position = [repo, path]
        positionString = os.path.join(folder, position[0], position[1])

        with open(positionString, 'r', encoding='UTF-8') as file:
            content = file.read()
        with open(positionString, 'r', encoding='UTF-8') as file:
            lines = len(file.readlines())
        extensionName = path.split(".")[-1:][0]
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
        return [content, extensionName, lines, sizeString]
    except:
        return True

def replaceTags(text):
    text = text.replace(";", "&nbsp;")
    text = text.replace("<", "&lt;")
    text = text.replace(">", "&gt;")
    return text

def getBranches(reponame):
    execCommandInRepo("GitGui", "git branch -a").split("\n")[:-1]
    output = subprocess.run(["git", "branch"], shell=True, cwd=folder+"\\"+reponame , stdout=subprocess.PIPE).stdout.decode('utf-8')[:-1].split("\n")
    branches = []
    currentBranch = ""
    for line in output:
        branches.append(line[2:])
        if line[0:1] == "*":
            currentBranch = line[2:]
    return [branches, currentBranch]

def makeBackup():
    execSSH("git add .")
    execSSH("git commit -m'Modify'")
    execSSH("git push")

def loadIcons():
    command = ["pscp","-pw",router_password, "-r", router_username +"@"+router_ip+":/volume1/GitNas/repository/.icons/",os.path.join(folder, "..", "images","repoIcons") ]
    subprocess.run(command, cwd=folder, shell=True, stdout=subprocess.DEVNULL,  stderr=subprocess.STDOUT)

def setIcon(reponame, path):
    command = ["pscp","-pw",router_password, path, router_username +"@"+router_ip+":/volume1/GitNas/repository/.icons/"+ reponame+".png"]
    subprocess.run(command, cwd=os.path.join(folder, ".."), stdout=subprocess.DEVNULL,  stderr=subprocess.STDOUT)


# loadRepositories()
loadRepositoriesThread = ThreadWithReturnValue(target=loadRepositories)
loadRepositoriesThread.start()


cloneRepos = Thread(target=updateClone)
cloneRepos.start()

loadIconsThread = Thread(target=loadIcons)
loadIconsThread.start()

backup1 = Thread(target=makeBackup)
backup1.start()