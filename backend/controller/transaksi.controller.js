const transaksiService = require('../service/transaksi.service');

exports.findAllTransApi = async (req, res) => {
	const trans = await transaksiService.findAllTrans();

	res.json({
		data: trans,
	});
};

exports.findTransByIdApi = async (req, res) => {
	const trans = await transaksiService.findTransById(req.params.id);

	if (trans != null) {
		res.json({ data: trans });
	} else {
		res.status(404).json({
			error: `Transaksi dengan id${req.params.id} tidak ditemukan`,
		});
	}
};

exports.createNewTransApi = async (req,res) => {
	const trans = await transaksiService.createNewTrans(req)
	res.status(201).json({data:trans})
}

exports.updateTransApi = async (req,res) => {
	const trans = await transaksiService.updateTrans(req,req.params.id)

	if (trans == null) {
		res.status(404).json({
			error: `Transaksi dengan id ${req.params.id} tidak ditemukan`,
		});
	} else {
		res.json({message:`Update transaksi berhasil`})
	}
}

exports.deleteTrans = async (req,res) => {
	const transById = await transaksiService.findTransById(req.params.id)

	if (transById == null) {
		res.status(404).json({error:`Transaksi dengan id ${req.params.id} tidak ditemukan`})
	} else {
		transaksiService.deleteTrans(transById)
		res.json({message:`Delete transaksi berhasil`})
	}
}
