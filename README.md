# GitNas

## Idee

Ich habe im April 2022 auf meinem Nas ein Git-Server eigerichtet und möchte nun eine Übersicht für dies machen. Bevor ich meine Projekte auf das Nas hochgeladen haben nutzte ich GitHub und bin mir diese Ansicht gewohnt. Daher möchte ich dies für mein Nas machen.

## User Cases

* Ich möchte meine Repositories auf einen Blick sehen und mit einer Beschreibung damit ich mir ein Bild von dem Projekt machen kann.
* In einem Repository bin möchte ich einen Fileexplorer haben in damit ich angenehm meine Files suchen kann.
* Ich möchte einen vorbereiteten Git-Command kopieren können um das Projekt zu Clonen, Pushen, und downloaden damit ich diese nicht auswendig wissen muss.
* Ich möchte die Files ansehen können mit einem Syntax-Highlight oder ein Bild ansehen können damit ich überprüfen kann, ob es die richtige Version ist.
* Im Fileexplorer möchte ich ein Icon haben, welches mir sagt, was es für ein File Type ist, um eine bessere Übersicht zu haben.
* Ich möchte neue Repositories erstellen können und auch wieder löschen können damit ich dies nicht in der Kommando-Zeile machen muss.
* Ich möchte mit einem Knopf zwischen den Branches wechseln könne damit ich auch andere Branches ansehen kann und zu überprüfen, ob alles richtig ist.

## Starten

Die Voraussetzung das das Programm funktioniert ist, das man Chrome installiert hat. Zudem musss man ein Nas-Gerät haben und diese Daten in das `.env`-File schreiben. Zudem sollte man Git-Server auf den Nas installiert haben und einen Ordner für die Repositories haben. In diesem Ordner muss ein `.icons`-Ordner sein welcher leer ist. Ebenso ist ein der Ordner für die Repositories selbst ein Repository mit einem Remote-Punkt, um ein Backup zu machen.

Wenn eine Konsole nicht stört, kann man `python main.py` in der Konsole eingeben oder `main.py` ausführen.

Falls die Konsole stört, kann man ein `.exe` machen, und zwar wie folgt:

Um ein `.exe` zu bekommen muss man `python -m eel main.py web --noconsole -i ./web/images/logo/logo.png` in der Konsole ausführen. Falls das Paket PyInstaller noch nicht installiert ist, muss man zuerst `pip install PyInstaller` ausführen

![logo](./web/images/Schriftzug.png)
