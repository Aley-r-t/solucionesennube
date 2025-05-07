# En este repositorio iran los laboratorios del curso de desarrollo de soluciones en la nube
## PC2


### Como desplegar proyecto en servidor
# Supociciones
- Para este deploy suponemos que sera la primera aplicacion que desplegara con APACHE y que lo tiene instalado
- Suponemos que tiene docker-compose instalado en su servidor
- Suponemos que tiene https configurad en apache 

# Pasos
- Clonar el repositorio
```bash
git clone  https://github.com/Aley-r-t/solucionesennube.git
```
- En caso tenga un dominio solo haria falta dirigirse a la carpeta que aloja su dominio por ejemplo 
```bash
cd /var/www/algo.com ## Accede al directorio
sudo su
nano deploy.sh     ##Dentro de pc2/deploy.sh (Copiar el contenido de aqui)
chmod +x ./deploy.sh
./deploy.sh
```
- Con estos pasos ya tendria corriendo en su dominio 
## NOTA: Cambiar las variables que en este caso estan las variables de demostracion
cambiar la varible dentro de 
```bash
nano deploy.sh #la vatiable DOMEIN remplace por la suya
```
### Como desplegar proyecto en local
- Ir a la carpeta 
```bash
cd /pc2 
sudo docker-compose up --build 
```

- Construir la aplicacion corre en el puerto 4000
```bash
sudo docker-compose up --build 
```

- Con el comando suiguiente se borra actualiza en caso haga algun cambio
```bash
sudo docker-compose down -v 
```