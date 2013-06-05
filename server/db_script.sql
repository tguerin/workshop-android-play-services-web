SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

CREATE SCHEMA IF NOT EXISTS `google_play_services` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
USE `google_play_services` ;

-- -----------------------------------------------------
-- Table `google_play_services`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `google_play_services`.`User` ;

CREATE  TABLE IF NOT EXISTS `google_play_services`.`User` (
  `id` INT NOT NULL ,
  `firstName` VARCHAR(45) NULL ,
  `lastName` VARCHAR(45) NULL ,
  `email` VARCHAR(45) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `google_play_services`.`Location`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `google_play_services`.`Location` ;

CREATE  TABLE IF NOT EXISTS `google_play_services`.`Location` (
  `id` INT NOT NULL ,
  `longitude` POINT NOT NULL ,
  `latitude` POINT NOT NULL ,
  `accuracy` INT NULL ,
  PRIMARY KEY (`id`) ,
  SPATIAL INDEX `LONG` (`longitude` ASC) ,
  SPATIAL INDEX `LAT` (`latitude` ASC) )
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `google_play_services`.`Event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `google_play_services`.`Event` ;

CREATE  TABLE IF NOT EXISTS `google_play_services`.`Event` (
  `id` INT NOT NULL ,
  `Location_id` INT NOT NULL ,
  `name` VARCHAR(45) NOT NULL ,
  `description` VARCHAR(300) NULL ,
  PRIMARY KEY (`id`, `Location_id`) ,
  INDEX `fk_Event_Location1` (`Location_id` ASC) ,
  CONSTRAINT `fk_Event_Location1`
    FOREIGN KEY (`Location_id` )
    REFERENCES `google_play_services`.`Location` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `google_play_services`.`Event_has_User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `google_play_services`.`Event_has_User` ;

CREATE  TABLE IF NOT EXISTS `google_play_services`.`Event_has_User` (
  `Event_id` INT NOT NULL ,
  `User_id` INT NOT NULL ,
  PRIMARY KEY (`Event_id`, `User_id`) ,
  INDEX `fk_Event_has_User_User1` (`User_id` ASC) ,
  CONSTRAINT `fk_Event_has_User_Event`
    FOREIGN KEY (`Event_id` )
    REFERENCES `google_play_services`.`Event` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Event_has_User_User1`
    FOREIGN KEY (`User_id` )
    REFERENCES `google_play_services`.`User` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `google_play_services`.`Device`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `google_play_services`.`Device` ;

CREATE  TABLE IF NOT EXISTS `google_play_services`.`Device` (
  `id` INT NOT NULL ,
  `User_id` INT NOT NULL ,
  `Location_id` INT NOT NULL ,
  `deviceId` VARCHAR(45) NULL ,
  `registrationId` VARCHAR(45) NULL ,
  PRIMARY KEY (`id`, `User_id`, `Location_id`) ,
  INDEX `fk_Device_User1` (`User_id` ASC) ,
  INDEX `fk_Device_Location1` (`Location_id` ASC) ,
  CONSTRAINT `fk_Device_User1`
    FOREIGN KEY (`User_id` )
    REFERENCES `google_play_services`.`User` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Device_Location1`
    FOREIGN KEY (`Location_id` )
    REFERENCES `google_play_services`.`Location` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
