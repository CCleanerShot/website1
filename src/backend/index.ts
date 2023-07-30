import utils from "./common/utils";
import localserver from "./localserver";

utils.configData = utils.loadConfig();
utils.itemData = utils.loadAmazonItems();
utils.userData = utils.loadUsers();

localserver.start();


