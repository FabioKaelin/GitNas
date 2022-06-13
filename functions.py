import datetime
import os
import sys
import zipfile
import subprocess
import paramiko
from dotenv import load_dotenv
import time
from threading import Thread


if (len(sys.argv) == 2 and sys.argv[1] == "debug"):
    debugmode = True
else:
    debugmode = False

icons = {
    "bat": "bat",
    "css": "css",
    "csv": "csv",
    "xlsx": "csv",
    "database": "database",
    "docker": "docker",
    "env": "env",
    "git": "git",
    "gitignore": "git",
    "gitkeep": "git",
    "go": "go",
    "html": "html",
    "gif": "image",
    "ico": "image",
    "jpeg": "image",
    "jpg": "image",
    "pdn": "image",
    "png": "image",
    "jar": "jar",
    "java": "java",
    "js": "js",
    "json": "json",
    "log": "log",
    "md": "markdown",
    "pdf": "pdf",
    "php": "php",
    "py": "python",
    "pyw": "python",
    "jsx": "react",
    "sass": "scss",
    "scss": "scss",
    "svg": "svg",
    "vue": "vue",
    "doc": "word",
    "docx": "word",
    "xml": "xml",
    "yaml": "yml",
    "yml": "yml",
    "7z": "zip",
    "rar": "zip",
    "zip": "zip",
}
imageTypes = ["png", "jpeg", "gif", "jpg"]

folder = os.path.normpath(os.path.join(__file__, "..", "web","repos"))
repositories = []

load_dotenv()
router_ip = os.getenv('ROUTER_IP')
router_username = os.getenv('ROUTER_USERNAME')
router_password = os.getenv('ROUTER_PASSWORD')
remote_path = os.getenv('REMOTE_PATH')
if remote_path[-1:] == "/": remote_path = remote_path[:-1]
if remote_path[:1] == "/": remote_path = remote_path[1:]

doubleBackslash = "\\"


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
        self.name = name.replace(".git", "")
        self.loadDescriptionThread = Thread(target=self.loadDescription)
        self.loadDescriptionThread.start()
        self.path = os.path.join(folder, self.name+".git")
        self.commits = []

    def loadDescription(self):
        self.description = execSSH(f"cd {self.name}.git; cat description")[0]

    def load(self):
        localRepos = execCommandInFolder("dir /a /B").split("\n")[:-1]
        self.description = execSSH(f"cd {self.name}.git; cat description")[0]
        if self.name in localRepos:
            execCommandInRepoOhne(self.name, "git restore .")
            execCommandInRepoOhne(self.name, "git pull")
        else:
            execCommandInFolderOhne("git clone " + getClone(self.name))
        output = getBranches(self.name)
        self.branches = output[0]
        self.currentBranch = output[1]

    def loadCommits(self):
        self.commits = []
        content = execCommandInRepo(
            self.name, "git log --decorate=no --date-order --format=oneline -n 1000").split("\n")[:-1]
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
        # execSSH("echo '" + description + "' > " + self.name + ".git/description")
        self.description = description
        execSSH(f"echo '{description}' > {self.name}.git/description")

    def __repr__(self):
        return f'<Repo name={self.name}>'


class Commit:
    def __init__(self):
        self.hash = ""
        self.message = ""
        self.date = ""

    def loadDate(self, reponame):
        output = subprocess.run(f"git log -n 1 --no-decorate {self.hash}", shell=True,
                                cwd=os.path.join(folder, reponame), stdout=subprocess.PIPE).stdout.decode('utf-8')[:-1].split("\n")
        if "Date" in output[2]:
            output = output[2].split(" ")[4:-1]
        else:
            output = output[3].split(" ")[4:-1]
        self.date = datetime.datetime.strptime(
            f"{output[1]} {output[0]} {output[3]}, {output[2]}", "%d %b %Y, %H:%M:%S")

    def __repr__(self):
        return f"<Commit message={self.message}>"


def execCommandInFolder(command):
    output = subprocess.run(command, shell=True,cwd=folder, stdout=subprocess.PIPE).stdout.decode('utf-8')
    return output


def execCommandInRepo(repo, command):
    output = subprocess.run(command, shell=True, cwd=os.path.join(
        folder, repo), stdout=subprocess.PIPE).stdout.decode('utf-8')[:-1]
    if debugmode:
        print("----------execCommandInRepo----------------start")
        print("repo:", repo)
        print("command:", command)
        print("----------execCommandInRepo----------------ende")
    return output


def execCommandInFolderOhne(command):
    subprocess.run(command, shell=True,cwd=folder,stderr=subprocess.DEVNULL, stdout=subprocess.PIPE)


def execCommandInRepoOhne(repo, command):
    subprocess.run(command, shell=True,cwd=os.path.join(folder, repo), stderr=subprocess.DEVNULL, stdout=subprocess.PIPE)


def execSSH(command):
    try:
        ssh = paramiko.SSHClient()
        ssh.load_system_host_keys()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(router_ip,
                    username=router_username,
                    password=router_password,
                    look_for_keys=False)
        _, ssh_stdout, _ = ssh.exec_command(
            f"cd /;cd volume1/GitNas/repository; {command}")
        output = [line.replace('\n', '') for line in ssh_stdout.readlines()]
        return output
    except paramiko.SSHException:
        time.sleep(0.1)
        ssh = paramiko.SSHClient()
        ssh.load_system_host_keys()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(router_ip,
                    username=router_username,
                    password=router_password,
                    look_for_keys=False)
        _, ssh_stdout, _ = ssh.exec_command(
            f"cd /;cd volume1/GitNas/repository; {command}")
        output = [line.replace('\n', '') for line in ssh_stdout.readlines()]
        return output
    except Exception as e:
        time.sleep(0.1)
        ssh = paramiko.SSHClient()
        ssh.load_system_host_keys()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(router_ip,
                    username=router_username,
                    password=router_password,
                    look_for_keys=False)
        _, ssh_stdout, _ = ssh.exec_command(
            f"cd /;cd volume1/GitNas/repository; {command}")
        output = [line.replace('\n', '') for line in ssh_stdout.readlines()]
        return output


def getClone(name):
    name = name
    return f"ssh://{router_username}@{router_ip}:/{remote_path}/{name}.git"


def updateCloneOne(repo, localRepos):
    global repositories
    if repo in localRepos:
        try:
            execCommandInRepoOhne(repo, "git restore .")
        except Exception as e:
            pass
        execCommandInRepoOhne(repo, "git pull")
    else:
        execCommandInFolderOhne("git clone "+getClone(repo))
    for line in execCommandInRepo(repo, "git branch -a").split("\n")[:-1]:
        if "remotes/origin/" in line[2:] and not "remotes/origin/HEAD" in line[2:]:
            execCommandInRepoOhne(repo, "git checkout " +
                                  line[2:].replace("remotes/origin/", ""))
    if "main" in execCommandInRepo(repo, "git branch -a"):
        execCommandInRepoOhne(repo, "git checkout main")


def updateClone():
    RemoteRepos = execSSH("ls")
    localRepos = execCommandInFolder("dir /a /B").split("\n")[:-1]
    for repo in RemoteRepos:
        updateCloneOne(repo.replace(".git", ""), localRepos)
    print("updateClone() finished")


def zipdir(path, ziph):
    for root, _, files in os.walk(path):
        if not("/.git" in root or "\\.git" in root):
            for file in files:
                ziph.write(os.path.join(root, file),
                           os.path.relpath(os.path.join(root, file),
                                           os.path.join(path, '..')))


def DownloadZIP(repo):
    from datetime import datetime
    ts = datetime.timestamp(datetime.now())
    with zipfile.ZipFile(f"C:{doubleBackslash}Users{doubleBackslash}{str(os.getlogin())}{doubleBackslash}Downloads{doubleBackslash}{repo}-{str(ts)}.zip", 'w', zipfile.ZIP_DEFLATED) as zipf:
        # with zipfile.ZipFile('C:\\Users\\'+str(os.getlogin())+'\\Downloads\\'+repo + "-" + str(ts) + ".zip", 'w', zipfile.ZIP_DEFLATED) as zipf:
        zipdir(os.path.join(folder, repo), zipf)


def loadRepositories():
    global repositories
    RemoteRepos = execSSH("ls")
    repositories = []
    for repo in RemoteRepos:
        repositories.append(Repository(repo))
    for repo in repositories:
        repo.loadDescriptionThread.join()
    return repositories


def getStructure(repo, path=""):
    position = [repo, path]
    positionString = os.path.join(folder, position[0], position[1])
    content = os.listdir(positionString)
    structure = []
    for file in content:
        if (file != ".git"):
            structure.append([file, os.path.isdir(
                os.path.join(folder, position[0], position[1], file))])
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
            return [content, extensionName, lines, sizeString]
        size = size / 1024
        if (size < 1024):
            sizeString = str(round(size, 2))+" KB"
            return [content, extensionName, lines, sizeString]
        size = size / 1024
        if (size < 1024):
            sizeString = str(round(size, 2))+" MB"
            return [content, extensionName, lines, sizeString]
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
    output = subprocess.run("git branch", shell=True, cwd=os.path.join(
        folder, reponame), stdout=subprocess.PIPE).stdout.decode('utf-8')[:-1].split("\n")
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
    command = f'pscp -pw {router_password} -r {router_username}@{router_ip}:/{remote_path}/.icons/ {os.path.join(folder, "..", "images", "repoIcons")}'
    subprocess.run(command, cwd=folder, shell=True,
                   stdout=subprocess.DEVNULL,  stderr=subprocess.STDOUT)


def setIcon(reponame, path):
    command = f'pscp -pw {router_password} {path} {router_username}@{router_ip}:/{remote_path}/.icons/{reponame}.png'
    subprocess.run(command, cwd=os.path.join(folder,".."),shell=True, stdout=subprocess.DEVNULL,  stderr=subprocess.STDOUT)


loadRepositoriesThread = ThreadWithReturnValue(target=loadRepositories)
loadRepositoriesThread.start()


cloneRepos = Thread(target=updateClone)
cloneRepos.start()

loadIconsThread = Thread(target=loadIcons)
loadIconsThread.start()

backup1 = Thread(target=makeBackup)
backup1.start()
