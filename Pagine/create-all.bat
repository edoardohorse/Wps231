@SETLOCAL enableextensions enabledelayedexpansion
@ECHO off 

SETLOCAL
set /a i=0
FOR /D %%i IN ("*") DO (CALL :Copia "%%i" & set /a i=i+1)
ENDLOCAL
EXIT /B 0

:Copia
    type ..\Commons\intestazione.html >  "%~1"
    type Content\index.html >> "%~1"
    type ..\Commons\pie.html >> "%~1"

