const Address = require('../models/address');

module.exports = {

async create(req, res, next){
    try {
        
        const address = req.body;
        const data = await Address.create(address);

        return res.status(201).json({
            success: true,
            message: 'La direccion correctamente',
            data: data.id
        });

    } catch (error) {
        console.log(`Error ${error}`);
        return res.status(501).json({
            success: false,
            message: 'Hubo un error creando la direccion',
            error: error
        });
    }
}

}