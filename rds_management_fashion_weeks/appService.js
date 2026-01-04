const oracledb = require('oracledb');
const loadEnvFile = require('./utils/envUtil');
const path = require("path");
const fs = require("fs");
const envVariables = loadEnvFile('./.env');

// Database configuration setup. Ensure your .env file has the required database credentials.
const dbConfig = {
    user: envVariables.ORACLE_USER,
    password: envVariables.ORACLE_PASS,
    connectString: `${envVariables.ORACLE_HOST}:${envVariables.ORACLE_PORT}/${envVariables.ORACLE_DBNAME}`,
    poolMin: 1,
    poolMax: 3,
    poolIncrement: 1,
    poolTimeout: 60
};

// initialize connection pool
async function initializeConnectionPool() {
    try {
        await oracledb.createPool(dbConfig);
        console.log('Connection pool started');
    } catch (err) {
        console.error('Initialization error: ' + err.message);
    }
}

async function closePoolAndExit() {
    console.log('\nTerminating');
    try {
        await oracledb.getPool().close(10); // 10 seconds grace period for connections to finish
        console.log('Pool closed');
        process.exit(0);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

initializeConnectionPool();

process
    .once('SIGTERM', closePoolAndExit)
    .once('SIGINT', closePoolAndExit);


// ----------------------------------------------------------
// Wrapper to manage OracleDB actions, simplifying connection handling.
async function withOracleDB(action) {
    let connection;
    try {
        connection = await oracledb.getConnection(); // Gets a connection from the default pool 
        return await action(connection);
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}


// ----------------------------------------------------------
// Core functions for database operations
// Modify these functions, especially the SQL queries, based on your project's requirements and design.
async function testOracleConnection() {
    return await withOracleDB(async (connection) => {
        return true;
    }).catch(() => {
        return false;
    });
}

async function fetchDemotableFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM DEMOTABLE');
        return result.rows;
    }).catch(() => {
        return [];
    });
}



async function fetchCollectionFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM Collections');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function fetchItemsFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM Item');
        return result.rows;
    }).catch(() => {
        return [];
    });
}


async function fetchDesignersFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM Designer');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function fetchCreativeDirectorsFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM CreativeDirector');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function fetchFw1FromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM Fashion_Week_1');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function fetchFw2FromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM Fashion_Week_2');
        return result.rows;
    }).catch(() => {
        return [];
    });
}
 
async function fetchShowFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM Show');
        return result.rows;
    }).catch(() => {
        return [];
    });
}


// async function initiateDemotable() {
//     return await withOracleDB(async (connection) => {
//         try {
//             await connection.execute(`DROP TABLE DEMOTABLE`);
//         } catch(err) {
//             console.log('Table might not exist, proceeding to create...');
//         }

//         const result = await connection.execute(`
//             CREATE TABLE DEMOTABLE (
//                 id NUMBER PRIMARY KEY,
//                 name VARCHAR2(20) UNIQUE
//             )
//         `);
//         return true;
//     }).catch(() => {
//         return false;
//     });
// }

async function initiateFullDatabase() {
    return await withOracleDB(async (connection) => {

        const dropstatements = [ 
            `DROP TABLE CreativeDirectorDirects`,
            `DROP TABLE GuestDesigner_2`,
            `DROP TABLE GuestDesigner_1`,
            `DROP TABLE DesignerCreatedCollection`,
            `DROP TABLE CreativeDirector`,
            `DROP TABLE Designer`,
            `DROP TABLE Item`,
            `DROP TABLE Collections`,
            `DROP TABLE ShowsModelWalks`,
            `DROP TABLE Model`,
            `DROP TABLE Show`,
            `DROP TABLE Fashion_Week_2`,
            `DROP TABLE Fashion_Week_1`,
            `DROP TABLE Brand_2`,
            `DROP TABLE Brand_1`,
            `DROP TABLE HoldingCompany`];
        
        for (const sql of dropstatements) {
            try {
                await connection.execute(sql);
                console.log(`Dropped: ${sql}`);
            } catch(err) {
                console.log('Table might not exist, proceeding to create...');
            }
        }
        const sqlFile = path.join(__dirname, "db.sql");
        const sqlContent = fs.readFileSync(sqlFile, "utf8");   
        console.log(`SQL file read successfully. Length: ${sqlContent.length} characters`);
     
        const statements = sqlContent
            .split(";")              
            .map(s => s.trim())      
            .filter(s => s.length);

            let successCount = 0;
            let errorCount = 0;

        for (const stmt of statements) {
            try {
                await connection.execute(stmt);
                successCount++;

            } catch (err) {
                errorCount++;
                console.log(err.message);
            }
        };

        await connection.commit();

        console.log(`Database initialization complete!`);
        console.log(`Success: ${successCount}, Errors: ${errorCount}`);

        return true;
    }).catch(() => {
        return false;
    });
}


async function insertDemotable(id, name) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO DEMOTABLE (id, name) VALUES (:id, :name)`,
            [id, name],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function updateNameDemotable(oldName, newName) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE DEMOTABLE SET name=:newName where name=:oldName`,
            [newName, oldName],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}



async function updateEmailDesignerTable(id, newEmail) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE Designer SET email=:newEmail where designer_id=:id`,
            [newEmail, id],
            { autoCommit: true }
        );



        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}




async function countDemotable() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT Count(*) FROM DEMOTABLE');
        return result.rows;
    }).catch(() => {
        return -1;
    });
}






async function countSeasons(numItems) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT COUNT(*) 
            FROM (SELECT season 
            FROM collections 
            GROUP BY season 
            HAVING AVG(number_of_items) > :numItems)`, 
        {numItems: numItems},
        { outFormat: oracledb.OUT_FORMAT_OBJECT });
        return result.rows[0];
    }).catch((err) => {
        console.error(err);
        return -1;
    });
}





async function projectCollections(checkedColumnNames) {
    return await withOracleDB(async (connection) => {
        const cols = checkedColumnNames.join(", ");
        // converting array of column names into 
        // a comma-separated string
        // E.g ["year", "name"] => "year, name"
        const result = await connection.execute(`SELECT ${cols} FROM Collections`);
        // sends SQL SELECT query to Oracle database, asking only for the columns that 
        // the user has selected
        return result.rows;
    }).catch(() => {
        return -1;
    });
}







async function deleteFromCollections(year, season, name) { 
    return await withOracleDB(async (connection) => { 
        const result = await connection.execute( 
            `DELETE FROM Collections WHERE year = :year AND season = :season AND name = :name`, 
            {year, season, name}, 
            { autoCommit: true } 
        ); 
        return result.rowsAffected && result.rowsAffected > 0; 
    }).catch(() => { 
        return false; 
    }); 
}


async function joinCreativeDirWithDesigner(minSalary) { 
    return await withOracleDB(async (connection) => { 
        const result = await connection.execute( 
            `SELECT *
            FROM Designer d
            JOIN CreativeDirector cd 
            ON d.designer_id = cd.designer_id
            WHERE cd.salary >= :minSalary`, 
            {minSalary}, 
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        ); 
        return result.rows;
    }).catch(() => { 
        console.error(err);
        return null; 
    }); 
}


async function findTopShowFashionWeeks() { 
    return await withOracleDB(async (connection) => { 
        const result = await connection.execute( 
            `
            SELECT outer_f.city,
                AVG(outer_f.cnt) AS avg_shows_per_year
            FROM (
                SELECT inner_f.city,
                    inner_f.year,
                    COUNT(*) AS cnt
                FROM (
                    SELECT fw1.year,
                        fw2.city,
                        sh.show_id
                    FROM Fashion_Week_1 fw1,
                        Fashion_Week_2 fw2,
                        Show sh
                    WHERE sh.start_date = fw1.start_date
                    AND sh.fashion_week_2_id = fw2.fashion_week_2_id
                ) inner_f
                GROUP BY inner_f.year, inner_f.city
            ) outer_f
            GROUP BY outer_f.city
            ORDER BY avg_shows_per_year DESC
            `, 
            {},
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        ); 
        return result.rows;
    }).catch(() => { 
        console.error(err);
        return null; 
    }); 
}

// Insert Show
async function insertShow(show_id, start_time, end_time, venue, start_date, fashion_week_2_id) {
    return await withOracleDB(async (connection) => {
        const checkFW = await connection.execute(
            `SELECT COUNT(*) as cnt FROM Fashion_Week_2 WHERE TRIM(fashion_week_2_id) = :fwId`,
            { fwId: fashion_week_2_id },
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        const fwExists = checkFW.rows[0].CNT > 0;

        const checkFW1 = await connection.execute(
            `SELECT COUNT(*) as cnt FROM Fashion_Week_1 WHERE start_date = TO_DATE(:startDate, 'YYYY-MM-DD')`,
            { startDate: start_date },
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        const dateExists = checkFW1.rows[0].CNT > 0;

        if (!fwExists) {
            return { success: false, message: 'Fashion Week ID does not exist.' };
        }

        if (!dateExists) {
            return { success: false, message: 'Start date does not exist.' };
        }

        // Both foreign keys exist, proceed with insert
        const result = await connection.execute(
            `INSERT INTO Show (show_id, start_time, end_time, venue, start_date, fashion_week_2_id)
            VALUES (:show_id, 
                TO_TIMESTAMP(:start_date || ' ' || :start_time, 'YYYY-MM-DD HH24:MI'), 
                TO_TIMESTAMP(:start_date || ' ' || :end_time, 'YYYY-MM-DD HH24:MI'), 
                :venue, 
                TO_DATE(:start_date, 'YYYY-MM-DD'), 
                :fashion_week_2_id)`,
            {show_id, start_time, end_time, venue, start_date, fashion_week_2_id},
            { autoCommit: true }
        );

        return { success: true, rowsAffected: result.rowsAffected, message: "Successful Insert!" };
    }).catch((err) => {
        console.error('Insert Show Error:', err);
        return { success: false, message: err.message };
    });
}

// Insert Model
async function insertModel(model_id, compensation, weight, height, age, last_name, first_name) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO Model (model_id, compensation, weight, height, age, last_name, first_name)
            VALUES (:model_id, :compensation, :weight, :height, :age, :last_name, :first_name)`,
            {model_id, compensation, weight, height, age, last_name, first_name},
            { autoCommit: true }
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch((err) => {
        console.error('Insert Model Error:', err); // Error handling for debugging
        return false;
    });
}

// Show Model
async function fetchModel() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM Model');
        return result.rows;
    }).catch(() => {
        return [];
    });
}


// Select Model
async function selectModel(conditions = []) {
    try {
        return await withOracleDB( async (connection) => {
            let query = 'SELECT * FROM Model';
            const binds = {};
            const whereParts = [];

            conditions.forEach((cond, i) => {
                const { attribute, operator, value, logic } = cond;
                const param = `p${i}`; // p1, p2, p3

                const logicPrefix = i > 0 && logic ? ` ${logic} ` : ""; // AND OR

                if (operator === "LIKE") { // LIKE SQL
                    whereParts.push(`${logicPrefix}${attribute} LIKE :${param}`); // AND name LIKE :p1
                    binds[param] = `%${value}%`;
                } else { // > < = 
                    whereParts.push(`${logicPrefix}${attribute} ${operator} :${param}`);
                    binds[param] = value;
                }
            });

            console.log(whereParts)
            
            // if we have where, then we where part
            if (whereParts.length > 0) {
                query += " WHERE " + whereParts.join("");
                console.log(query)
            }

            const result = await connection.execute(query, binds, {
                outFormat: oracledb.OUT_FORMAT_OBJECT,
            });
            // return result
            return result.rows;
        });

    } catch(err) { // error handling, debugging
        console.error("Select Model Error: ", err);
        return null;
    }
}

// Show GuestDesigner
async function fetchGuestDesigner1FromDb(){
    try{
        return await withOracleDB(async (connection) => {
            const result = await connection.execute("SELECT * FROM GuestDesigner_1");
            return result.rows;
        })
    } catch {
        return [];
    }
}

async function fetchGuestDesigner2FromDb(){
    try{
        return await withOracleDB(async (connection) => {
            const result = await connection.execute("SELECT * FROM GuestDesigner_2");
            return result.rows;
        })
    } catch {
        return [];
    }
}

async function fetchGuestDesigner2FromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM GuestDesigner_2');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

// Group Guest Designer
async function groupGuestDesignerByBrand(){
    try {
        return await withOracleDB(async (connection) => {
            const sql = `
            SELECT 
                gd1.associated_brand,
                COUNT(gd2.designer_id) AS num_guest_designers,
                AVG(gd1.compensation) AS avg_compensation,
                MAX(gd1.compensation) AS max_compensation,
                MIN(gd1.compensation) AS min_compensation
            FROM GuestDesigner_1 gd1
            LEFT JOIN GuestDesigner_2 gd2 
                ON gd1.associated_brand = gd2.associated_brand
            GROUP BY gd1.associated_brand
            HAVING COUNT(gd2.designer_id) > 0
            ORDER BY avg_compensation DESC
            `;

            const result = await connection.execute(sql, [], {
                outFormat: oracledb.OUT_FORMAT_OBJECT
            });

            return result.rows;
        });
    } catch(err) {
        console.error("Group Guest Designer Error: ", err)
    }
}

// Division Models
async function findAllModelsInAllFashionWeek(fashionWeekID){
    return await withOracleDB(async (connection) => {
        try {
            const sql = 
            `SELECT DISTINCT m.model_id, m.first_name, m.last_name, m.compensation
            FROM Model m
            WHERE NOT EXISTS (
                (SELECT s.show_id
                 FROM Show s
                 WHERE TRIM(s.fashion_week_2_id) = :1)
                MINUS
                (SELECT smw.show_id
                 FROM ShowsModelWalks smw
                 WHERE smw.model_id = m.model_id)
            )
            AND EXISTS (
                SELECT 1
                FROM ShowsModelWalks smw
                JOIN Show s ON smw.show_id = s.show_id
                WHERE smw.model_id = m.model_id
                AND TRIM(s.fashion_week_2_id) = :2
            )
            ORDER BY m.model_id`;

            const result = await connection.execute(
                sql, 
                [fashionWeekID, fashionWeekID],
                {
                    outFormat: oracledb.OUT_FORMAT_OBJECT
                }
            );
            
            return result.rows;

        } catch(err) {
            console.error("Division Error:", err);
            return null;
        }
    }).catch(() => {
        return null;
    });
}

// Show ModelWalksShow
async function fetchModelWalksShow() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT sml.model_id, m.last_name, m.first_name, sml.show_id, s.fashion_week_2_id 
            FROM ShowsModelWalks sml, Show s, Model m 
            WHERE sml.show_id = s.show_id AND sml.model_id = m.model_id 
            ORDER BY sml.model_id`);
        return result.rows;
    }).catch(() => {
        return [];
    });
}

module.exports = {
    testOracleConnection,
    updateEmailDesignerTable,
    countSeasons,

    fetchCollectionFromDb,
    initiateFullDatabase,
    deleteFromCollections,
    fetchItemsFromDb,
    fetchDesignersFromDb,
    fetchCreativeDirectorsFromDb,
    joinCreativeDirWithDesigner,
    findTopShowFashionWeeks,
    fetchFw1FromDb,
    fetchFw2FromDb,
    fetchShowFromDb,
    
    insertShow, // Insert Show
    fetchModel, // Show Model
    insertModel, // Insert Model
    selectModel, // Select Model

    groupGuestDesignerByBrand, // Group Guest Designer

    fetchGuestDesigner1FromDb, // Show GuestDesigner
    fetchGuestDesigner2FromDb, // Show GuestDesigner
    projectCollections,

    findAllModelsInAllFashionWeek, // Division Models
    fetchModelWalksShow, // Show ModelWalksShow
};


