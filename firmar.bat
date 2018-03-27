@echo off
echo ============================================================
echo = Bienvenido al sistema de firmas para android de Phonegap =
echo ============================================================
echo.
echo.
echo ============================================================
echo = Daniel Riera www.danielriera.net - @DanyRiera_ on Twitter
echo ============================================================
echo =                                                          =
echo =            Compilando en modo release                    =
echo =               %DATE% - %TIME%                   =
echo ============================================================
echo.
for /f "delims=" %%a in ('wmic OS Get localdatetime  ^| find "."') do set dt=%%a
set YYYY=%dt:~0,4%
set MM=%dt:~4,2%
set DD=%dt:~6,2%
set HH=%dt:~8,2%
set Min=%dt:~10,2%
set Sec=%dt:~12,2%

set datetimef=%YYYY%-%MM%-%DD%_%HH%-%Min%-%Sec%


call phonegap build android --release

echo.
echo ============================================================
echo =                                                          =
echo = Se ha generado la apk en modo release                    =
echo =                                                          =
echo ============================================================
echo.

if "%1" == "" (
	echo Indique la password del .keystore
	set /p pass= 

	echo Indique el alias del .keystore
	set /p alias= 
) else (
    echo Las claves se han recibido por consola
    set pass=%1
    set alias=%2
)


echo.
echo ============================================================
echo =                                                          =
echo =       Ok! Usaremos la pass %pass%                  
echo =                                                          =
echo ============================================================
echo.

cd platforms/android/build/outputs/apk/

jarsigner -sigalg SHA1withRSA -digestalg SHA1 -keystore ../../../../../firma.keystore -storepass %pass% android-release-unsigned.apk %alias%

zipalign 4 android-release-unsigned.apk app_%datetimef%.apk

cd ../../../../../

echo.
echo ============================================================
echo =
echo =    Se ha generado un apk firmada       
echo =    con el nombre app_%datetimef%.apk    
echo ============================================================
echo.

echo Presiona cualquier tecla para cerrar
pause
exit