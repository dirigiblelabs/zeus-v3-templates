var query = require("db/v4/query");
var producer = require("messaging/v4/producer");
var daoApi = require("db/v4/dao");
var dao = daoApi.create({
	table: "ZEUS_TEMPLATE_CONTAINERS",
	properties: [
		{
			name: "Id",
			column: "TEMPLATE_CONTAINER_ID",
			type: "INTEGER",
			id: true,
			required: true
		}, {
			name: "Template",
			column: "TEMPLATE_CONTAINER_TEMPLATE",
			type: "INTEGER",
			required: true
		}, {
			name: "Container",
			column: "TEMPLATE_CONTAINER_CONTAINER",
			type: "INTEGER",
			required: true
		}]
});

exports.list = function(settings) {
	return dao.list(settings);
};

exports.get = function(id) {
	return dao.find(id);
};

exports.create = function(entity) {
	var id = dao.insert(entity);
	triggerEvent("Create", {
		table: "ZEUS_TEMPLATE_CONTAINERS",
		key: {
			name: "Id",
			column: "TEMPLATE_CONTAINER_ID",
			value: id
		}
	});
	return id;
};

exports.update = function(entity) {
	dao.update(entity);
	triggerEvent("Update", {
		table: "ZEUS_TEMPLATE_CONTAINERS",
		key: {
			name: "Id",
			column: "TEMPLATE_CONTAINER_ID",
			value: entity.Id
		}
	});
};

exports.delete = function(id) {
	dao.remove(id);
	triggerEvent("Delete", {
		table: "ZEUS_TEMPLATE_CONTAINERS",
		key: {
			name: "Id",
			column: "TEMPLATE_CONTAINER_ID",
			value: id
		}
	});
};

exports.count = function() {
	return dao.count();
};

exports.customDataCount = function() {
	var resultSet = query.execute("SELECT COUNT(*) FROM TEMPLATECONTAINERS");
	if (resultSet !== null && resultSet[0] !== null) {
		if (resultSet[0].COUNT !== undefined && resultSet[0].COUNT !== null) {
			return resultSet[0].COUNT;
		} else if (resultSet[0].count !== undefined && resultSet[0].count !== null) {
			return resultSet[0].count;
		}
	}
	return 0;
};

function triggerEvent(operation, data) {
	producer.queue("zeus-templates/Build/TemplateContainers/" + operation).send(JSON.stringify(data));
}