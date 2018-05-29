export default (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    created: {
      field: 'created',
      type: DataTypes.DATE,
    },
    updated: {
      field: 'updated',
      type: DataTypes.DATE,
    },
    name: {
      type: DataTypes.STRING(256),
      requred: true,
      unique: true,
    },
    domain_name: {
      type: DataTypes.STRING(256),
    },
    email_domain: {
      type: DataTypes.STRING(512),
    },
    status: {
      type: DataTypes.INTEGER,
    },
    tz: {
      type: DataTypes.STRING(128),
    },
  }, {
    schema: 'public',
    tableName: 'company',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created',
    updatedAt: 'updated',
  });

  Company.associate = (models) => {
    Company.hasMany(models.User, {
      foreignKey: 'company_id',
      as: 'users',
    });
  };

  return Company;
};
