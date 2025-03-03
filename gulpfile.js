import { src, dest, watch } from 'gulp';
import * as dartSass from 'sass'; // Se trae la librería Dart Sass para que gulp-sass la use
import gulpSass from 'gulp-sass'; // Gulp-Sass compila Sass usando la librería Dart Sass

const sass = gulpSass( dartSass ); // Se le pasa la librería Dart Sass a gulp-sass

export function css(done){
    //ubica el archivo scss
    src('src/scss/app.scss') // Archivo de entrada que se usa para ubicar los archivos Sass
        //compila el archivo scss
        .pipe( sass().on('error', sass.logError) ) // Una vez ubicado el archivo busca el pipe para realizar la tarea y en caso de haber un error lo muestra en consola
        //Guarda el archivo css en la carpeta build/css
        .pipe( dest('build/css') )

    done()
}

export function dev(){// no se necesita el done por que no se esta ejecutando una tarea asincrona
    watch( 'src/scss/**/*.scss', css ) // Se le pasa la tarea css para que se ejecute cuando se detecten cambios en los archivos Sass
}