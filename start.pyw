import os
import subprocess

subprocess.run("@echo off & start /B test.bat", shell=True, cwd=os.path.join(__file__, "..") , stdout=subprocess.PIPE)
exit()