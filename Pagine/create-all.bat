@SETLOCAL enableextensions enabledelayedexpansion
@ECHO off 

cls 
SETLOCAL
REM erase *.html
set /a i=0
FOR /R %%i IN ("Content\*") DO (CALL :Copia "%%i" & set /a i=i+1)
copy index.html ..
erase index.html
ENDLOCAL
EXIT /B 0

:Copia    
    SET index=index
    IF NOT %~n1 == index (
        type ..\Commons\intestazione.html >  "%~n1".html && type Content\%~n1.html >> "%~n1".html && type ..\Commons\pie.html >> "%~n1".html
        ) ELSE ( type ..\Commons\intestazione-index.html >  "%~n1".html && type Content\%~n1.html >> "%~n1".html && type ..\Commons\pie-index.html >> "%~n1".html )

    REM type ..\Commons\intestazione.html >  "%~n1".html
    REM type Content\%~n1.html >> "%~n1".html
    REM type ..\Commons\pie.html >> "%~n1".html






REM %~1         - expands %1 removing any surrounding quotes (")
REM %~f1        - expands %1 to a fully qualified path name
REM %~d1        - expands %1 to a drive letter only
REM %~p1        - expands %1 to a path only
REM %~n1        - expands %1 to a file name only
REM %~x1        - expands %1 to a file extension only
REM %~s1        - expanded path contains short names only
REM %~a1        - expands %1 to file attributes
REM %~t1        - expands %1 to date/time of file
REM %~z1        - expands %1 to size of file
REM %~dp1       - expands %1 to a drive letter and path only
REM %~nx1       - expands %1 to a file name and extension only