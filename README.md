# Backend Serverless con NestJS + AWS

Este proyecto es un backend en NestJS siguiendo principios SOLID, desplegado en AWS mediante Serverless Framework v4.  
Soporta ejecución local (offline) para pruebas y despliegue directo en AWS.

---

## Requisitos previos

1. **Cuenta AWS** activa con permisos de administración (IAM Identity Center o llaves).  
2. **Node.js** (>= 20.x recomendado).  
3. **AWS CLI** y **Serverless Framework CLI** configurados en tu entorno.  

---

## Estructura del proyecto

- `src/` → Código fuente en NestJS organizado por módulos.  
- `serverless.yml` → Configuración de Serverless Framework.  
- `serverless/*.yml` → Archivos adicionales de configuración (DynamoDB, IAM, RDS, etc.).  
- `package.json` → Scripts de npm y dependencias.
- `db_script.sql` → Modelo de base de datos en mysql.    

---

## Comandos principales

### 1. Ejecutar en desarrollo (NestJS local)
```bash
npm run start:dev
```

### 2. Ejecutar en modo offline (simular Lambdas)
```bash
npm run sls:offline
```

### 3. Desplegar en AWS
```bash
npm run sls:deploy
```

### 4. Eliminar stack de AWS
```bash
sls remove --stage dev
```

---

## Logs de Lambdas

Logs de funciones específicas:

```bash
# Lambda principal de appointment
sls logs -f appointment --stage dev

# Otras Lambdas
sls logs -f appointment_pe --stage dev
sls logs -f appointment_cl --stage dev
sls logs -f appointment_common --stage dev
```

---

## Ver configuración final

Para previsualizar cómo quedará el stack en AWS:

```bash
sls print --stage dev
```

---

##  Base de datos RDS

Se creo un archivo db_script.sql que modela la base de datos minima en mysql para guardar los Appointmments, junto con otras tablas para permitir un mejor contexto.

Se utilizarán **dos instancias MySQL** mínimas (`t2.micro`):

- `mysql_pe`  
- `mysql_cl`  

> **Nota:** Aunque las RDS se crearán, es necesario configurar los **Security Groups** y la **VPC** antes de habilitar la conexión en el proyecto.  
> Esto implica actualizar el `serverless.yml` con la sección `vpc:` y asignar `securityGroupIds` y `subnetIds`.

---

## Secrets Manager

La conexión a RDS debe manejar credenciales de forma segura usando **AWS Secrets Manager**.  
Actualmente el proyecto está preparado para integrarlo, pero requiere configurar:

- Host, username, password y dbname de ambas RDS en el Secret Manager.  

---

## Generación de módulos en NestJS

Para crear nuevos módulos:

```bash
nest generate module nombre
```

---

## Flujo esperado

1. Descarga el proyecto.  
2. Configura tu cuenta AWS en el CLI.  
3. Ejecuta:  
   ```bash
   npm install
   npm run sls:deploy
   ```
4. Verifica que la API esté desplegada en API Gateway y que DynamoDB esté creado.  
5. (Opcional) Habilitar RDS + Secrets Manager + VPC en el `serverless.yml` para conexión a MySQL.  

---

