package controllers;

import org.codehaus.jackson.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;

import play.data.Form;
import play.db.jpa.Transactional;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import controllers.converter.DeviceConverter;
import controllers.dto.DeviceMsg;
import fr.xebia.gps.db.entity.DeviceDB;
import fr.xebia.gps.service.DeviceService;

@org.springframework.stereotype.Controller
@Transactional
public class DeviceRS extends Controller {

    @Autowired
    private DeviceService deviceService;

    public Result create() {
        Form<DeviceMsg> form = new Form<DeviceMsg>(DeviceMsg.class).bindFromRequest();
        DeviceMsg device = form.get();
        DeviceDB createdDevice = deviceService.create(DeviceConverter.convertToEntity(device));
        return ok(Json.toJson(DeviceConverter.convertToDto(createdDevice)));
    }

    public Result update() {
        Form<DeviceMsg> form = new Form<DeviceMsg>(DeviceMsg.class).bindFromRequest();
        DeviceMsg device = form.get();
        DeviceDB updatedDevice = deviceService.update(DeviceConverter.convertToEntity(device));
        return ok(Json.toJson(DeviceConverter.convertToDto(updatedDevice)));
    }

    public Result delete() {
        JsonNode request = request().body().asJson();
        if (request == null) {
            return badRequest("Expecting Json data");
        }

        deviceService.delete(request.findPath("id").getIntValue());
        return ok();
    }

    public Result getById() {
        JsonNode request = request().body().asJson();
        if (request == null) {
            return badRequest("Expecting Json data");
        }

        DeviceDB device = deviceService.getById(request.findPath("id").getIntValue());
        return ok(Json.toJson(DeviceConverter.convertToDto(device)));

    }

}
