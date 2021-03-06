var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

var Page = db.define('page', {
  title: {
      type: Sequelize.STRING,
      allowNull: false
  },
  urlTitle: {
      type: Sequelize.STRING,
      allowNull: false,
  //     validate: {
  //       isUrl: true
  // }
  },
  content: {
      type: Sequelize.TEXT,
      allowNull: false
  },
  status: {
      type: Sequelize.ENUM('open', 'closed')
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
}},
{ hooks: {
  beforeValidate: (page) => {
    if (page.title) {
      page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
    } else {
      page.urlTitle = Math.random().toString(36).substring(2, 7);
    }
  }},
  getterMethods: {
    route(){
      return '/wiki/' + this.urlTitle
    }
  }
});

var User = db.define('user', {
  name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
      isAlphanumeric: true
      }
  },
  email: {
      type: Sequelize.STRING,
      allowNull: false,
  //     validate: {
  //       isEmail: true
  // }}
  }
});

Page.belongsTo(User, { as: 'author' });

// function generateUrlTitle (title) {
//   if (title) {
//     // Removes all non-alphanumeric characters from title
//     // And make whitespace underscore
//     return title.replace(/\s+/g, '_').replace(/\W/g, '');
//   } else {
//     // Generates random 5 letter string
//     return Math.random().toString(36).substring(2, 7);
//   }
// }

module.exports = {
Page: Page,
User: User,
db: db
};
