package controllers;

import org.codehaus.jackson.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;

import play.data.Form;
import play.db.jpa.Transactional;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import controllers.converter.UserConverter;
import controllers.dto.UserMsg;
import fr.xebia.gps.db.entity.UserDB;
import fr.xebia.gps.service.UserService;

@org.springframework.stereotype.Controller
@Transactional
public class UserRS extends Controller {

    @Autowired
    private UserService userService;

    public Result create() {
        Form<UserMsg> form = new Form<UserMsg>(UserMsg.class).bindFromRequest();
        UserMsg user = form.get();
        UserDB createdUser = userService.create(UserConverter.convertToEntity(user));
        return ok(Json.toJson(UserConverter.convertToDto(createdUser)));
    }

    public Result update() {
        Form<UserMsg> form = new Form<UserMsg>(UserMsg.class).bindFromRequest();
        UserMsg user = form.get();
        UserDB updatedUser = userService.update(UserConverter.convertToEntity(user));
        return ok(Json.toJson(UserConverter.convertToDto(updatedUser)));
    }

    public Result delete() {
        JsonNode request = request().body().asJson();
        if (request == null) {
            return badRequest("Expecting Json data");
        }

        userService.delete(request.findPath("id").getIntValue());
        return ok();
    }

    public Result getById() {
        JsonNode request = request().body().asJson();
        if (request == null) {
            return badRequest("Expecting Json data");
        }

        UserDB user = userService.getById(request.findPath("id").getIntValue());
        return ok(Json.toJson(UserConverter.convertToDto(user)));

    }

}
