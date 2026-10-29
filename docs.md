# Concurrencia en base de datos

## Temario Unidad 4
- 4.1 Conceptos
- 4.2 Propiedades de las transacciones
- 4.3 Grados de consistencia
- 4.4 Niveles de aislamiento
- 4.5 Commit y rollback

## Integrantes
- José Alfredo López De La Cruz
- Diego Alberto Ramirez Hernandez
- Victor Emiliano Garduza Alvarez
- Alexander Vidal Gallegos

### 4.1 Conceptos

#### ¿Qué es la concurrencia?
Concurrencia en bases de datos es cuando varios usuarios o procesos acceden y modifican los mismos datos al mismo tiempo. No significa que todo ocurra exactamente en el mismo instante físico, sino que las operaciones se intercalan en el tiempo y se traslapan.

##### Conceptos clave
- Transacción: un grupo de operaciones (lecturas y escrituras) que se tratan como una sola unidad. Ej: transferir dinero = restar en una cuenta + sumar en otra.
- Ejecución concurrente: varias transacciones corriendo intercaladas, no una tras otra.
- Ejecución serial: una transacción completa y luego la siguiente. Es la más segura, pero la más lenta.
- Planificación (schedule): el orden en que se intercalan las operaciones de varias transacciones.
- Serializabilidad: una ejecución concurrente es correcta si da el mismo resultado que alguna ejecución serial. Es la meta del control de concurrencia.
- Control de concurrencia: los mecanismos que usa el SGBD para que la concurrencia no corrompa los datos.

##### ¿Por que se necesita?
Sin concurrencia, el sistema atendería a un usuario a la vez: sería seguro, pero muy lento. Con concurrencia hay **mejor rendimiento y más usuarios atendidos**, pero aparecen riesgos si no se controla.
 
| Problema | Qué pasa |
|---|---|
| **Actualización perdida** | Dos transacciones modifican el mismo dato y una borra el cambio de la otra |
| **Lectura sucia** | Lees un dato que otra transacción cambió pero todavía no confirma (y quizá lo revierta) |
| **Lectura no repetible** | Lees lo mismo dos veces y te da valores distintos |
| **Fantasma** | Repites una consulta y aparecen o desaparecen filas |
 
## Ejemplo de actualización perdida
 
Saldo inicial: **$1000**
 
| Tiempo | Transacción A | Transacción B |
|---|---|---|
| 1 | Lee saldo = 1000 | |
| 2 | | Lee saldo = 1000 |
| 3 | Suma 200 → escribe 1200 | |
| 4 | | Resta 100 → escribe 900 |
 
Resultado final: **$900**. Debió ser **$1100**. El depósito de A se perdió.

### 4.2 Propiedades de las transacciones (ACID)

Una **transacción** es una unidad lógica de trabajo: un conjunto de operaciones (lecturas y escrituras) que se ejecutan como un todo. Para que una transacción sea confiable, el SGBD debe garantizar cuatro propiedades conocidas por sus siglas en inglés: **ACID**.

| Propiedad | Significado | Ejemplo |
|---|---|---|
| **Atomicidad** (Atomicity) | Todo o nada | Si falla el abono, también se revierte el cargo |
| **Consistencia** (Consistency) | Lleva la base de datos de un estado válido a otro estado válido | El saldo total no cambia tras una transferencia |
| **Aislamiento** (Isolation) | Las transacciones concurrentes no se interfieren entre sí | Una transacción no ve los cambios a medias de otra |
| **Durabilidad** (Durability) | Lo confirmado persiste aunque haya fallas | Tras el commit, un apagón no pierde los datos |

---

## Atomicidad

La transacción se ejecuta **completa o no se ejecuta**. No existen resultados parciales.

- Si algo falla a la mitad, el SGBD deshace todo lo que se hizo (**rollback**).
- Se apoya en el **log de transacciones** para saber qué revertir.

**Ejemplo:** transferir $500 de la cuenta 1 a la cuenta 2.

1. Restar $500 a la cuenta 1.
2. Sumar $500 a la cuenta 2.

Si el paso 2 falla, el paso 1 se deshace. Nunca debe quedar dinero "desaparecido".

## Consistencia

Cada transacción debe dejar la base de datos cumpliendo **todas las reglas de integridad**: llaves primarias y foráneas, restricciones (`CHECK`, `UNIQUE`, `NOT NULL`), triggers y reglas del negocio.

- Antes y después de la transacción, los datos son válidos.
- Si una transacción viola una regla, se cancela.

**Ejemplo:** si existe la regla "el saldo no puede ser negativo" y una transferencia dejaría la cuenta en -$200, la transacción se rechaza.

## Aislamiento

Aunque varias transacciones corran al mismo tiempo, el resultado debe ser **equivalente a que se hubieran ejecutado una tras otra** (serializabilidad).

- Evita problemas como lecturas sucias, lecturas no repetibles y fantasmas.
- Se implementa con bloqueos (locks), timestamps o MVCC.
- Es configurable mediante los **niveles de aislamiento** (tema 4.4).

**Ejemplo:** mientras A transfiere dinero, B no puede ver un estado intermedio donde el dinero ya salió de una cuenta pero aún no llegó a la otra.

## Durabilidad

Una vez que se hace **COMMIT**, los cambios son permanentes, incluso si el sistema se cae justo después.

- Se logra escribiendo en el **log de transacciones** (write-ahead logging) antes de confirmar.
- Al reiniciar, el SGBD recupera los cambios confirmados que no alcanzaron a escribirse en disco.

**Ejemplo:** confirmas una compra y se va la luz. Al volver, la compra sigue registrada.

---

## Resumen rápido

| Propiedad | Pregunta que responde | Mecanismo principal |
|---|---|---|
| Atomicidad | ¿Se hizo todo o nada? | Log y rollback |
| Consistencia | ¿Se respetan las reglas? | Constraints, triggers |
| Aislamiento | ¿Se estorban entre transacciones? | Locks, MVCC, niveles de aislamiento |
| Durabilidad | ¿Sobrevive a una falla? | Log y recuperación |

## Ejemplo completo en SQL

```sql
BEGIN TRANSACTION;

UPDATE cuentas SET saldo = saldo - 500 WHERE id = 1;
UPDATE cuentas SET saldo = saldo + 500 WHERE id = 2;

-- Si todo salió bien:
COMMIT;      -- Durabilidad: los cambios ya son permanentes

-- Si algo falló:
-- ROLLBACK; -- Atomicidad: se deshace todo
```

### 4.3 Grados de consistencia

Los **grados de consistencia** (*degrees of consistency*) vienen del trabajo de **Jim Gray** y colaboradores. Clasifican qué tan protegida está una transacción frente a la interferencia de otras transacciones concurrentes.

La idea central: **a mayor grado, más consistencia, pero menos concurrencia y menor rendimiento**.

Los grados se definen según **cuánto tiempo se mantienen los bloqueos (locks)** de lectura y escritura:

- **Bloqueo corto**: se libera apenas termina la operación.
- **Bloqueo largo**: se mantiene hasta el final de la transacción (COMMIT o ROLLBACK).

---

## Grado 0

- **Bloqueos de escritura:** cortos.
- **Bloqueos de lectura:** no hay.
- Evita únicamente que una transacción **sobrescriba datos sucios** de otra mientras la operación está en curso.
- Permite casi todas las anomalías: actualizaciones perdidas, lecturas sucias, lecturas no repetibles y fantasmas.
- Si la transacción se cancela, no hay garantía de poder deshacer sus cambios correctamente.

## Grado 1

- **Bloqueos de escritura:** largos (hasta el final de la transacción).
- **Bloqueos de lectura:** no hay.
- Nadie puede sobrescribir un dato que tu transacción modificó hasta que termines, por lo que **no se pierden actualizaciones** y el rollback es seguro.
- Todavía permite lecturas sucias, lecturas no repetibles y fantasmas.
- Equivale aproximadamente a **Read Uncommitted**.

## Grado 2

- **Bloqueos de escritura:** largos.
- **Bloqueos de lectura:** cortos.
- Como para leer hay que poder obtener el bloqueo, no se pueden leer datos que otra transacción modificó y no ha confirmado: **evita lecturas sucias**.
- Todavía permite lecturas no repetibles y fantasmas.
- Equivale aproximadamente a **Read Committed**.

## Grado 3

- **Bloqueos de escritura:** largos.
- **Bloqueos de lectura:** largos.
- Lo que lees no cambia hasta que termines tu transacción: **evita lecturas no repetibles**.
- Con bloqueos sobre el rango o predicado de la consulta, también **evita fantasmas**.
- Es el aislamiento total: el resultado equivale a una ejecución serial.
- Equivale aproximadamente a **Serializable**.

---

## Tabla comparativa

| Grado | Actualización perdida | Lectura sucia | Lectura no repetible | Fantasma | Equivalente SQL (aprox.) |
|---|---|---|---|---|---|
| **0** | Posible | Posible | Posible | Posible | — |
| **1** | No | Posible | Posible | Posible | Read Uncommitted |
| **2** | No | No | Posible | Posible | Read Committed |
| **3** | No | No | No | No | Serializable |

> **Nota:** la equivalencia con los niveles de aislamiento de SQL es aproximada. Los niveles del estándar SQL se definen por las anomalías que permiten o evitan, y cada SGBD los implementa a su manera (por ejemplo, con MVCC en lugar de bloqueos). Los veremos en el tema 4.4.

## Resumen: la escalera de consistencia

| Grado | Qué agrega respecto al anterior |
|---|---|
| 0 → 1 | Bloqueos de escritura largos: sin actualizaciones perdidas |
| 1 → 2 | Bloqueos de lectura cortos: sin lecturas sucias |
| 2 → 3 | Bloqueos de lectura largos: sin lecturas no repetibles ni fantasmas |

## Idea clave

No siempre se necesita el grado 3. Muchas aplicaciones funcionan bien con el grado 2 porque ofrece un buen equilibrio entre **seguridad de los datos** y **rendimiento**. Elegir el grado correcto depende de qué tan crítico es que los datos sean exactos en cada operación.

### 4.4 Niveles de aislamiento

El **nivel de aislamiento** define **qué tanto una transacción queda protegida de los cambios que hacen otras transacciones al mismo tiempo**. Es la forma en que el SGBD implementa la "I" de ACID (Isolation) y permite elegir entre:

- **Más aislamiento** → datos más consistentes, pero más esperas y menos rendimiento.
- **Menos aislamiento** → más velocidad y concurrencia, pero pueden aparecer anomalías.

El estándar SQL define **4 niveles**, ordenados de menos a más estricto.

---

## Anomalías que controlan

| Anomalía | Qué pasa |
|---|---|
| **Lectura sucia** (dirty read) | Lees un dato que otra transacción modificó pero aún no confirma (y quizá haga rollback) |
| **Lectura no repetible** (non-repeatable read) | Lees la misma fila dos veces en tu transacción y el valor cambió |
| **Fantasma** (phantom read) | Repites una consulta con la misma condición y aparecen o desaparecen filas |

### Ejemplos rápidos

**Lectura sucia**

| Tiempo | Transacción A | Transacción B |
|---|---|---|
| 1 | `UPDATE cuentas SET saldo = 0 WHERE id = 1` (sin commit) | |
| 2 | | `SELECT saldo FROM cuentas WHERE id = 1` → **0** |
| 3 | `ROLLBACK` | |

B leyó un valor que nunca llegó a existir realmente.

**Lectura no repetible**

| Tiempo | Transacción A | Transacción B |
|---|---|---|
| 1 | `SELECT saldo ... WHERE id = 1` → **1000** | |
| 2 | | `UPDATE ... SET saldo = 500 WHERE id = 1` + `COMMIT` |
| 3 | `SELECT saldo ... WHERE id = 1` → **500** | |

A leyó la misma fila dos veces y obtuvo valores distintos.

**Fantasma**

| Tiempo | Transacción A | Transacción B |
|---|---|---|
| 1 | `SELECT * FROM cuentas WHERE saldo > 500` → **3 filas** | |
| 2 | | `INSERT` de una cuenta con saldo 800 + `COMMIT` |
| 3 | `SELECT * FROM cuentas WHERE saldo > 500` → **4 filas** | |

Apareció una fila "fantasma" que antes no estaba.

---

## Los 4 niveles del estándar SQL

### 1. Read Uncommitted (lectura no confirmada)

- El nivel más bajo: **permite leer datos no confirmados**.
- Casi no usa bloqueos de lectura, por eso es el más rápido.
- **Riesgo:** lecturas sucias, no repetibles y fantasmas.
- **Uso:** reportes aproximados o estadísticas donde la exactitud no es crítica.

### 2. Read Committed (lectura confirmada)

- Solo se leen datos **ya confirmados** (COMMIT).
- **Evita:** lecturas sucias.
- **Permite:** lecturas no repetibles y fantasmas.
- Es el **nivel por defecto** en SQL Server, PostgreSQL y Oracle.
- **Uso:** la mayoría de las aplicaciones web y de negocio.

### 3. Repeatable Read (lectura repetible)

- Si lees una fila, **vuelves a obtener el mismo valor** mientras dure tu transacción.
- **Evita:** lecturas sucias y lecturas no repetibles.
- **Permite (según el estándar):** fantasmas.
- Es el nivel por defecto en **MySQL (InnoDB)**.
- **Uso:** cuando se lee varias veces el mismo dato dentro de una transacción (cálculos, validaciones).

### 4. Serializable (serializable)

- El nivel más alto: las transacciones se comportan **como si se ejecutaran una por una**.
- **Evita:** todas las anomalías, incluidos los fantasmas.
- **Costo:** más bloqueos, más esperas, más posibilidad de deadlocks o de transacciones canceladas.
- **Uso:** operaciones financieras críticas, inventarios con stock muy limitado.

---

## Tabla comparativa

| Nivel | Lectura sucia | Lectura no repetible | Fantasma | Rendimiento |
|---|---|---|---|---|
| **Read Uncommitted** | Posible | Posible | Posible | Muy alto |
| **Read Committed** | No | Posible | Posible | Alto |
| **Repeatable Read** | No | No | Posible | Medio |
| **Serializable** | No | No | No | Bajo |

---

## Cómo se configura

**SQL Server / MySQL**

```sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
-- Otras opciones:
-- READ UNCOMMITTED
-- REPEATABLE READ
-- SERIALIZABLE

BEGIN TRANSACTION;  -- en MySQL: START TRANSACTION;
    SELECT saldo FROM cuentas WHERE id = 1;
    UPDATE cuentas SET saldo = saldo - 500 WHERE id = 1;
COMMIT;
```

**PostgreSQL**

```sql
BEGIN ISOLATION LEVEL REPEATABLE READ;
    SELECT saldo FROM cuentas WHERE id = 1;
COMMIT;
```

---

## Cómo lo implementan los SGBD

Los niveles dicen **qué** garantizar, no **cómo**. Hay dos enfoques principales:

| Enfoque | Cómo funciona | Efecto |
|---|---|---|
| **Bloqueos (locking)** | Los lectores y escritores se bloquean entre sí | Más esperas y posibles deadlocks |
| **MVCC** (versionado multiversión) | Se guardan varias versiones de cada fila; cada transacción ve una "foto" de los datos | Lectores y escritores casi no se estorban |

### Detalles por motor

| SGBD | Nivel por defecto | Notas |
|---|---|---|
| **SQL Server** | Read Committed | Tiene además el nivel **Snapshot** (basado en versionado). Con la opción `READ_COMMITTED_SNAPSHOT` el Read Committed usa versiones en lugar de bloqueos |
| **PostgreSQL** | Read Committed | Usa MVCC. Read Uncommitted se comporta igual que Read Committed. Su Repeatable Read también evita fantasmas |
| **MySQL (InnoDB)** | Repeatable Read | Usa MVCC y bloqueos de rango (*gap locks*) que reducen los fantasmas |
| **Oracle** | Read Committed | Usa MVCC. Ofrece Serializable y Read Only; no tiene Read Uncommitted ni Repeatable Read |

> **Ojo:** el comportamiento real puede variar entre versiones y motores. Para tu proyecto, conviene revisar la documentación del SGBD que uses.

---

## ¿Cómo elegir el nivel?

| Situación | Nivel recomendado |
|---|---|
| Reportes rápidos donde un pequeño error no importa | Read Uncommitted |
| Aplicación típica (CRUD, tiendas, blogs) | Read Committed |
| Cálculos que leen el mismo dato varias veces | Repeatable Read |
| Transferencias, inventario crítico, reservas | Serializable |

## Idea clave

Subir el nivel de aislamiento **protege más los datos pero reduce la concurrencia**. Lo recomendable es usar el nivel más bajo que todavía garantice la corrección de tu aplicación.

### 4.5 Commit y rollback

Son las dos instrucciones que **cierran una transacción**. Con ellas decides si los cambios que hiciste se guardan para siempre o se descartan.

| Instrucción | Qué hace | Propiedad ACID que respalda |
|---|---|---|
| **COMMIT** | Confirma la transacción y hace **permanentes** los cambios | Durabilidad |
| **ROLLBACK** | **Deshace** todos los cambios desde el inicio de la transacción | Atomicidad |

---

## Ciclo de vida de una transacción

1. **Inicio:** `BEGIN TRANSACTION` (o `START TRANSACTION`).
2. **Operaciones:** `INSERT`, `UPDATE`, `DELETE`, `SELECT`...
3. **Cierre**, de una de dos formas:
   - `COMMIT` → los cambios se guardan y se hacen visibles para los demás.
   - `ROLLBACK` → los cambios se descartan y todo vuelve al estado inicial.

Mientras la transacción está abierta, los cambios **solo son visibles para ella** (según el nivel de aislamiento) y los datos modificados permanecen **bloqueados** para otras transacciones.

---

## COMMIT

Confirma la transacción:

- Los cambios se vuelven **permanentes**, incluso si el sistema falla después.
- Los cambios pasan a ser visibles para otras transacciones.
- Se liberan los bloqueos que la transacción tenía.
- Ya **no se puede hacer rollback** de lo confirmado.

```sql
BEGIN TRANSACTION;

UPDATE cuentas SET saldo = saldo - 500 WHERE id = 1;
UPDATE cuentas SET saldo = saldo + 500 WHERE id = 2;

COMMIT;
```

## ROLLBACK

Cancela la transacción:

- Deshace **todas** las modificaciones hechas desde el `BEGIN`.
- La base de datos queda como estaba antes de iniciar.
- Se liberan los bloqueos.

```sql
BEGIN TRANSACTION;

DELETE FROM cuentas WHERE id = 1;   -- ¡Error! Se borró la cuenta equivocada

ROLLBACK;                           -- Todo vuelve a como estaba
```

### ¿Cuándo se hace rollback?

- **Manualmente**, cuando el programador detecta un error o una condición inválida (por ejemplo, saldo insuficiente).
- **Automáticamente**, cuando el SGBD detecta un problema:
  - Violación de una restricción (llave foránea, `CHECK`, `UNIQUE`...).
  - Error grave durante la ejecución.
  - Caída del sistema o corte de conexión antes del `COMMIT`.
  - Un **deadlock**: el SGBD elige una "víctima" y le hace rollback.

---

## SAVEPOINT (punto de guardado)

Un **savepoint** es un punto intermedio dentro de una transacción al que puedes volver **sin cancelar todo**.

**MySQL / PostgreSQL / Oracle**

```sql
BEGIN;  -- en MySQL: START TRANSACTION;

INSERT INTO pedidos (id, cliente) VALUES (1, 'Ana');
SAVEPOINT despues_del_pedido;

INSERT INTO detalle_pedido (pedido_id, producto) VALUES (1, 'Laptop');
-- Algo salió mal en este paso:
ROLLBACK TO SAVEPOINT despues_del_pedido;  -- en Oracle: ROLLBACK TO despues_del_pedido;

-- El pedido sigue vigente, solo se deshizo el detalle
COMMIT;
```

**SQL Server** (usa otra sintaxis)

```sql
BEGIN TRANSACTION;

INSERT INTO pedidos (id, cliente) VALUES (1, 'Ana');
SAVE TRANSACTION despues_del_pedido;

INSERT INTO detalle_pedido (pedido_id, producto) VALUES (1, 'Laptop');
ROLLBACK TRANSACTION despues_del_pedido;

COMMIT;
```

---

## Autocommit y transacciones explícitas

| Modo | Cómo funciona |
|---|---|
| **Autocommit** | Cada sentencia es **su propia transacción** y se confirma sola. Es el modo por defecto en SQL Server, MySQL y PostgreSQL |
| **Transacción explícita** | Tú indicas el inicio (`BEGIN`) y el final (`COMMIT` / `ROLLBACK`) |
| **Transacción implícita** | El SGBD inicia una transacción automáticamente y tú debes confirmarla (en SQL Server: `SET IMPLICIT_TRANSACTIONS ON`; en Oracle es el comportamiento normal) |

> **Ojo:** en autocommit, un `DELETE` sin `WHERE` se confirma al instante y no se puede deshacer con `ROLLBACK`. Por eso, para operaciones delicadas, conviene abrir una transacción explícita.

Algunos motores (MySQL, Oracle) hacen un **commit implícito** al ejecutar instrucciones DDL como `CREATE TABLE` o `ALTER TABLE`, así que estas no se pueden deshacer con rollback.

---

## Manejo de errores con COMMIT y ROLLBACK

El patrón recomendado es: **intentar todo, y si algo falla, hacer rollback**.

**SQL Server (`TRY...CATCH`)**

```sql
BEGIN TRY
    BEGIN TRANSACTION;

    UPDATE cuentas SET saldo = saldo - 500 WHERE id = 1;
    UPDATE cuentas SET saldo = saldo + 500 WHERE id = 2;

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;

    THROW;  -- vuelve a lanzar el error original
END CATCH;
```

**Ejemplo en Java (JDBC)**, útil si tu proyecto usa Java:

```java
try {
    conn.setAutoCommit(false);          // iniciar transacción manual

    // ... ejecutar los UPDATE ...

    conn.commit();                      // todo salió bien
} catch (SQLException e) {
    conn.rollback();                    // algo falló: deshacer todo
}
```

---

## Qué pasa si hay una falla antes del COMMIT

| Momento de la falla | Resultado |
|---|---|
| **Antes del COMMIT** | Al reiniciar, el SGBD usa el **log** para deshacer lo que no se confirmó (rollback automático) |
| **Después del COMMIT** | Los cambios son permanentes; si no alcanzaron a escribirse en disco, el SGBD los **rehace** desde el log |

---

## Resumen

| Concepto | Idea clave |
|---|---|
| **COMMIT** | Guarda los cambios de forma permanente |
| **ROLLBACK** | Descarta todos los cambios de la transacción |
| **SAVEPOINT** | Permite deshacer solo una parte |
| **Autocommit** | Cada sentencia se confirma sola |
| **Buena práctica** | Agrupar operaciones relacionadas en una transacción y usar `TRY...CATCH` (o `try/catch`) con rollback |

# Referencias bibliográficas (formato APA 7)
 
Unidad 4: Concurrencia y transacciones
 
## Libros
 
Elmasri, R., & Navathe, S. B. (2007). *Fundamentos de sistemas de bases de datos* (5.ª ed.). Pearson Educación.
 
Gray, J., & Reuter, A. (1993). *Transaction processing: Concepts and techniques*. Morgan Kaufmann.
 
Silberschatz, A., Korth, H. F., & Sudarshan, S. (2014). *Fundamentos de bases de datos* (6.ª ed.). McGraw-Hill.
 
## Artículos académicos
 
Berenson, H., Bernstein, P., Gray, J., Melton, J., O'Neil, E., & O'Neil, P. (1995). A critique of ANSI SQL isolation levels. *ACM SIGMOD Record, 24*(2), 1–10.
 
Gray, J., Lorie, R. A., Putzolu, G. R., & Traiger, I. L. (1976). Granularity of locks and degrees of consistency in a shared data base. En G. M. Nijssen (Ed.), *Modelling in data base management systems* (pp. 365–394). North-Holland. https://www.cs.purdue.edu/homes/bb/cs542-20Spr/readings/cc/granularity-locks.pdf
 
Härder, T., & Reuter, A. (1983). Principles of transaction-oriented database recovery. *ACM Computing Surveys, 15*(4), 287–317.
 
## Documentación oficial
 
Microsoft. (s. f.). *SET TRANSACTION ISOLATION LEVEL (Transact-SQL)*. Microsoft Learn. Recuperado el 29 de octubre de 2026, de https://learn.microsoft.com/en-us/sql/t-sql/statements/set-transaction-isolation-level-transact-sql
 
Oracle Corporation. (s. f.). *MySQL 8.4 reference manual: 17.7.2.1 Transaction isolation levels*. MySQL. Recuperado el 29 de octubre de 2026, de https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html
 
Oracle Corporation. (s. f.). *MySQL 8.4 reference manual: SET TRANSACTION statement*. MySQL. Recuperado el 29 de octubre de 2026, de https://dev.mysql.com/doc/refman/8.4/en/set-transaction.html
 
The PostgreSQL Global Development Group. (s. f.). *PostgreSQL documentation: 13.2. Transaction isolation*. PostgreSQL. Recuperado el 29 de octubre de 2026, de https://www.postgresql.org/docs/current/transaction-iso.html
 
---