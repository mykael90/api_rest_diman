module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      'ALTER TABLE `sisman_pro`.`buildings_sipac` CHANGE COLUMN `sub_rip` `sub_rip` VARCHAR(255) NOT NULL , DROP PRIMARY KEY, ADD PRIMARY KEY (`sub_rip`);',
    );
  },

  down: async (queryInterface, Sequelize) => {},
};
