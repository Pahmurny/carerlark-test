import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
      type: DataTypes.STRING(128),
      requred: true,
      unique: true,
    },
    slack_id: {
      type: DataTypes.STRING(16),
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    job_title: {
      type: DataTypes.STRING(256),
    },
    first_name: {
      type: DataTypes.STRING(256),
    },
    last_name: {
      type: DataTypes.STRING(256),
    },
    real_name: {
      type: DataTypes.STRING(1024),
    },
    email: {
      type: DataTypes.STRING(320),
    },
    skype: {
      type: DataTypes.STRING(128),
    },
    phone: {
      type: DataTypes.STRING(128),
    },
    title: {
      type: DataTypes.STRING(128),
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    image_24: {
      type: DataTypes.STRING(2048),
    },
    image_32: {
      type: DataTypes.STRING(2048),
    },
    image_48: {
      type: DataTypes.STRING(2048),
    },
    image_72: {
      type: DataTypes.STRING(2048),
    },
    image_192: {
      type: DataTypes.STRING(2048),
    },
    tz: {
      type: DataTypes.STRING(128),
    },
    is_install_user: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    password: {
      type: DataTypes.STRING,
    },
  }, {
    schema: 'public',
    tableName: 'user',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created',
    updatedAt: 'updated',
  });

  User.associate = (models) => {
    User.belongsTo(models.Company, {
      targetKey: 'id',
      foreignKey: 'company_id',
      as: 'company',
    });
    User.hasMany(models.Feedback, {
      foreignKey: 'requester_id',
      as: 'requester_to',
    });
    User.hasMany(models.Feedback, {
      foreignKey: 'giver_id',
      as: 'giver_to',
    });
    User.hasMany(models.Feedback, {
      foreignKey: 'receiver_id',
      as: 'receiver_to',
    });
    User.hasMany(models.Feedback, {
      foreignKey: 'person_about_id',
      as: 'person_about_to',
    });
    User.belongsToMany(models.FeedbackRequest, {
      foreignKey: 'giver_id',
      otherKey: 'request_id',
      through: models.RequestGiver,
      as: { singular: 'request_giver', plural: 'requests_giver' },
    });
  };

  User.hook('beforeSave', (user, options) => {
    if (user.changed('password')) {
      const saltRounds = 5;
      return bcrypt.hash(user.password, saltRounds)
        .then((hash) => {
          user.password = hash;
        })
        .catch(error => sequelize.Promise.reject(new Error('Error while saving user')));
    }
  });

  User.prototype.view = function view() {
    const userData = {};
    let fields = [
      'id',
      'name',
      'job_title',
      'last_name',
      'real_name',
      'email',
      'skype',
      'phone',
      'title',
      'image_24',
      'image_32',
      'image_48',
      'image_72',
      'image_192',
      'tz',
    ];
    if (this.is_admin) {
      fields = [...fields, 'is_admin', 'created', 'updated'];
    }
    fields.forEach((field) => { userData[field] = this[field]; });
    return userData;
  };

  User.prototype.authenticate = function authenticate(password) {
    return bcrypt.compare(password, this.password).then(valid => (valid ? this : false));
  };

  return User;
};
