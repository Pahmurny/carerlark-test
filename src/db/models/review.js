export default (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
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
    type: {
      type: DataTypes.STRING(100),
    },
    status: {
      type: DataTypes.STRING(100),
    },
  }, {
    schema: 'public',
    tableName: 'review',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created',
    updatedAt: 'updated',
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      targetKey: 'id',
      foreignKey: 'reviewer_id',
      as: 'reviewer',
    });
    Review.belongsTo(models.User, {
      targetKey: 'id',
      foreignKey: 'person_about_id',
      as: 'person_about',
    });
  };

  return Review;
};
