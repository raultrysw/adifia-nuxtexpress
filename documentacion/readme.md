# Proceso de recuperación de todos los artículos en profile

```flow
st=>start: Empieza la recuperacion
e=>end: Acaba todo
op=>operation: Leer `nivelPermiso`
nivelPermiso=>condition: nivelPermiso

operationsForAdmin=>operation: (Si es admin) Meter artículos sin publicar y los propios
operationsForVocal=>operation: (Si es vocal) Meter los artículos propios
noOperation=>operation: (Si no es vocal) No hacer nada


st->op->nivelPermiso
nivelPermiso(yes)->operationsForAdmin

operationsForAdmin->e
```

