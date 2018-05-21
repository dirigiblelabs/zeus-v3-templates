var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'ZEUS_CONTAINERS',
	'properties': [
		{
			'name':  'Id',
			'column': 'ZC_ID',
			'type':'INTEGER',
			'id': true,
			'required': true
		},		{
			'name':  'Name',
			'column': 'NAME',
			'type':'VARCHAR',
			'id': false,
			'required': true
		},		{
			'name':  'Image',
			'column': 'IMAGE',
			'type':'VARCHAR',
			'id': false,
			'required': true
		},		{
			'name':  'Protocol',
			'column': 'ZC_PROTOCOL',
			'type':'INTEGER',
			'id': false,
			'required': true
		},		{
			'name':  'Port',
			'column': 'PORT',
			'type':'VARCHAR',
			'id': false,
			'required': true
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