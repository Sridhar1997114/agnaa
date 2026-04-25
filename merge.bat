@echo off
set "target=I:\AGNAA\Enthalpy Labs 05-04-2026\Files\Blogs"
set "output=%target%\MEGA.md"

echo Merging files...
if exist "%output%" del "%output%"

for /l %%i in (1,1,100) do (
    if exist "%target%\topic%%i_complete.md" (
        echo Adding topic%%i_complete.md
        type "%target%\topic%%i_complete.md" >> "%output%"
        echo. >> "%output%"
        echo --- >> "%output%"
        echo. >> "%output%"
    )
)

echo Done.
dir "%output%"
