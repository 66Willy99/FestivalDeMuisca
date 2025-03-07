import { src, dest, watch, series } from 'gulp';
import * as dartSass from 'sass'; // Se trae la librería Dart Sass para que gulp-sass la use
import gulpSass from 'gulp-sass'; // Gulp-Sass compila Sass usando la librería Dart Sass

const sass = gulpSass( dartSass ); // Se le pasa la librería Dart Sass a gulp-sass

export function js(done){
    src('src/js/app.js')
        .pipe( dest('build/js') )
    done()
}

export function css(done){
    //ubica el archivo scss
    src('src/scss/app.scss', {sourcemaps: true}) // Archivo de entrada que se usa para ubicar los archivos Sass y tambien crear el sourcemap
        //compila el archivo scss
        .pipe( sass().on('error', sass.logError) ) // Una vez ubicado el archivo busca el pipe para realizar la tarea y en caso de haber un error lo muestra en consola
        //Guarda el archivo css en la carpeta build/css
        .pipe( dest('build/css', {sourcemaps: '.'}) ) // Una vez compilado el archivo lo guarda en la carpeta build/css junto con el sourcemap
    done()
}

export function html(done){
    src('index.html') // Ubica el archivo HTML en src/
        .pipe(dest('build')) // Lo copia a la carpeta build
    done();
}

export function imgs(done){
    src('src/img/**/*') // Ubica todas las imágenes dentro de src/img/
        .pipe(dest('build/img')) // Copia a build/img/
    done();
}

export function video(done){
    src('video/*') // Ubica todas las imágenes dentro de src/img/
        .pipe(dest('build/video')) // Copia a build/img/
    done();
}

export function dev(){// no se necesita el done por que no se esta ejecutando una tarea asincrona
    watch( 'src/scss/**/*.scss', css ) // Se le pasa la tarea css para que se ejecute cuando se detecten cambios en los archivos Sass
    watch( 'src/js/**/*.js', js )
}

export default series( js, css, html, imgs, video) // Se ejecutan las tareas js, css y dev en serie