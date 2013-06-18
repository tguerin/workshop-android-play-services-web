package controllers;

import org.codehaus.jackson.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;

import play.data.Form;
import play.db.jpa.Transactional;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import controllers.converter.EventConverter;
import controllers.dto.EventMsg;
import fr.xebia.gps.db.entity.EventDB;
import fr.xebia.gps.service.EventService;

@org.springframework.stereotype.Controller
@Transactional
public class EventRS extends Controller {

    @Autowired
    private EventService eventService;

    public Result create() {
        Form<EventMsg> form = new Form<EventMsg>(EventMsg.class).bindFromRequest();
        EventMsg event = form.get();
        EventDB createdEvent = eventService.create(EventConverter.convertToEntity(event));
        return ok(Json.toJson(EventConverter.convertToDto(createdEvent)));
    }

    public Result update() {
        Form<EventMsg> form = new Form<EventMsg>(EventMsg.class).bindFromRequest();
        EventMsg event = form.get();
        EventDB updatedEvent = eventService.update(EventConverter.convertToEntity(event));
        return ok(Json.toJson(EventConverter.convertToDto(updatedEvent)));
    }

    public Result delete() {
        JsonNode request = request().body().asJson();
        if (request == null) {
            return badRequest("Expecting Json data");
        }

        eventService.delete(request.findPath("id").getIntValue());
        return ok();
    }

    public Result getById() {
        JsonNode request = request().body().asJson();
        if (request == null) {
            return badRequest("Expecting Json data");
        }

        EventDB event = eventService.getById(request.findPath("id").getIntValue());
        return ok(Json.toJson(EventConverter.convertToDto(event)));

    }

    public Result subscribe() {
        JsonNode request = request().body().asJson();
        if (request == null) {
            return badRequest("Expecting Json data");
        }
        Integer eventId = request.findPath("eventId").getIntValue();
        Integer userId = request.findPath("userId").getIntValue();
        eventService.subscribe(eventId, userId);
        return ok();
    }

    public Result unsubscribe() {
        JsonNode request = request().body().asJson();
        if (request == null) {
            return badRequest("Expecting Json data");
        }
        Integer eventId = request.findPath("eventId").getIntValue();
        Integer userId = request.findPath("userId").getIntValue();
        eventService.unsubscribe(eventId, userId);
        return ok();
    }

}
