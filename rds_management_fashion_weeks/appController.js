const express = require('express');
const appService = require('./appService');

const router = express.Router();

// ----------------------------------------------------------
// API endpoints
// Modify or extend these routes based on your project's needs.
router.get('/check-db-connection', async (req, res) => {
    const isConnect = await appService.testOracleConnection();
    if (isConnect) {
        res.send('connected');
    } else {
        res.send('unable to connect');
    }
});

// router.get('/demotable', async (req, res) => {
//     const tableContent = await appService.fetchDemotableFromDb();
//     res.json({data: tableContent});
// });

router.get('/collections', async (req, res) => {
    const tableContent = await appService.fetchCollectionFromDb();
    res.json({data: tableContent});
});

router.get('/items', async (req, res) => {
    const tableContent = await appService.fetchItemsFromDb();
    res.json({data: tableContent});
});

router.get('/designers', async (req, res) => {
    const tableContent = await appService.fetchDesignersFromDb();
    res.json({data: tableContent});
});

router.get('/creativedirector', async (req, res) => {
    const tableContent = await appService.fetchCreativeDirectorsFromDb();
    res.json({data: tableContent});
});

router.get('/fw1', async (req, res) => {
    const tableContent = await appService.fetchFw1FromDb();
    res.json({data: tableContent});
});

router.get('/fw2', async (req, res) => {
    const tableContent = await appService.fetchFw2FromDb();
    res.json({data: tableContent});
});

router.get('/show', async (req, res) => {
    const tableContent = await appService.fetchShowFromDb();
    res.json({data: tableContent});
});


router.post("/initiate-fashion-database", async (req, res) => {
    const initiateResult = await appService.initiateFullDatabase();
    if (initiateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

// router.post("/initiate-demotable", async (req, res) => {
//     const initiateResult = await appService.initiateFullDatabase();
//     if (initiateResult) {
//         res.json({ success: true });
//     } else {
//         res.status(500).json({ success: false });
//     }
// });

// router.post("/insert-demotable", async (req, res) => {
//     const { id, name } = req.body;
//     const insertResult = await appService.insertDemotable(id, name);
//     if (insertResult) {
//         res.json({ success: true });
//     } else {
//         res.status(500).json({ success: false });
//     }
// });

// router.post("/update-name-demotable", async (req, res) => {
//     const { oldName, newName } = req.body;
//     const updateResult = await appService.updateNameDemotable(oldName, newName);
//     if (updateResult) {
//         res.json({ success: true });
//     } else {
//         res.status(500).json({ success: false });
//     }
// });




router.post("/update-email-designer-table", async (req, res) => {
    const { DesignerId, NewDesignerEmail } = req.body;

    const updateResult = await appService.updateEmailDesignerTable(DesignerId, NewDesignerEmail);
    if (updateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});





// router.get('/count-demotable', async (req, res) => {
//     const tableCount = await appService.countDemotable();
//     if (tableCount >= 0) {
//         res.json({ 
//             success: true,  
//             count: tableCount
//         });
//     } else {
//         res.status(500).json({ 
//             success: false, 
//             count: tableCount
//         });
//     }
// });





router.post('/count-seasons', async (req, res) => {
    const { numItems } = req.body;
    console.log("numItems: ", numItems);

    const seasonCountResult = await appService.countSeasons(numItems);
    console.log("seasonCountResult: ", seasonCountResult);
    
    if (seasonCountResult === null || seasonCountResult === -1) {
        res.status(500).json({ success: false, seasonCount: 0 });
    } else {
        const count = seasonCountResult['COUNT(*)'];
        res.json({ success: true, seasonCount: count });
    }
});





router.post('/project-collections', async (req, res) => {
    // defines a POST route
    const {checkedColumnNames} = req.body;
    // Reads the JSON sent by the frontend and extracts checkedColumnNames

    const response = await appService.projectCollections(checkedColumnNames);
    // Calls backend (appService) function 'projectCollections' that query the database

    if (response == -1) {
        console.log("NO ROWS");
        return res.json({ success : false})
    } else {
        return res.json({ success : true, response : response});
    }

});






router.post("/delete-collection", async (req, res) => {
    const { year, season, name } = req.body;
    const insertResult = await appService.deleteFromCollections(year, season, name);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});


router.post("/join-creative-director-designer", async (req, res) => {
    const { salary } = req.body;
    const rows = await appService.joinCreativeDirWithDesigner(salary);
    if (rows === null) {
        res.status(500).json({ success: false, rows: [] });
    } else {
         res.json({ success: true, rows: rows });
    }
});

router.get("/get-top-fw", async (req, res) => {

    const rows = await appService.findTopShowFashionWeeks();
    if (rows === null) {
        res.status(500).json({ success: false, rows: [] });
    } else {
         res.json({ success: true, rows: rows });
    }
});

// Insert Show
router.post("/insert-show", async (req, res) => {
    const { show_id, start_time, end_time, venue, start_date, fashion_week_2_id } = req.body;
    const insertResult = await appService.insertShow(show_id, start_time, end_time, venue, start_date, fashion_week_2_id);
    if (insertResult) {
        res.json({ success: true, message: insertResult.message});
    } else {
        res.status(500).json({ success: false, message: insertResult?.message || 'Unknown error'});
    }
});

// Insert Model
router.post("/insert-model", async (req, res) => {
    const { model_id, compensation, weight, height, age, last_name, first_name } = req.body;
    const insertResult = await appService.insertModel(model_id, compensation, weight, height, age, last_name, first_name);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

// Show Model
router.get('/model', async (req, res) => {
    const tableContent = await appService.fetchModel();
    if (tableContent) {
        res.json({ success: true, data: tableContent});
    } else {
        res.status(500).json({ success: false });
    }
});

// Select Model
router.post("/select-model", async (req, res) => {
    const {conditions} = req.body; // conditions from frontend
    const rows = await appService.selectModel(conditions);
    if (rows) {
        res.json({ success: true , rows: rows});
    } else {
        res.status(500).json({ success: false });
    }
});

// Group Guest Designer
router.get("/group-guest-designer", async (req, res) => {
    const rows = await appService.groupGuestDesignerByBrand();
    if (rows) {
        res.json({ success: true , rows: rows});
    } else {
        res.status(500).json({ success: false });
    }
});

// Show GuestDesigner
router.get("/guestdesigner1", async (req, res) => {
    res.json({ data: await appService.fetchGuestDesigner1FromDb() });
});

router.get('/guestdesigner2', async (req, res) => {
    res.json({ data: await appService.fetchGuestDesigner2FromDb() });
});

// Division Models
router.post("/division-models-all-shows", async (req, res) => {
    const { fashionWeekId } = req.body;
    const rows = await appService.findAllModelsInAllFashionWeek(fashionWeekId);
    
    if (rows !== null) {
        res.json({ success: true, rows: rows });
    } else {
        res.status(500).json({ success: false, rows: [] });
    }
});

// Show Show ModelWalksShow
router.get('/modelWalksShow', async (req, res) => {
    const tableContent = await appService.fetchModelWalksShow();
    if (tableContent) {
        res.json({ success: true, data: tableContent});
    } else {
        res.status(500).json({ success: false });
    }
});

module.exports = router;