var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'ZEUS_TEMPLATE_SERVICE_TYPES',
	'properties': [
		{
			'name':  'Id',
			'column': 'ZTST_ID',
			'type':'INTEGER',
			'id': true,
			'required': true
		},		{
			'name':  'Name',
			'column': 'ZTST_NAME',
			'type':'VARCHAR',
			'id': false,
			'required': false
		}]
});

exports.list = function(settings) {
	return dao.list(settings);
};

exports.get = function(id) {
	return dao.find(id);
};

exports.create = function(entity) {
	return dao.insert(entity);
};

exports.update = function(entity) {
	return dao.update(entity);
};

exports.delete = function(id) {
	dao.remove(id);
};