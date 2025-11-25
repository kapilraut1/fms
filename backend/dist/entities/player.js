var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, } from "typeorm";
import { IsUrl, IsOptional, Max, Min } from "class-validator";
export var Position;
(function (Position) {
    Position["Goalkeeper"] = "Goalkeeper";
    Position["Defender"] = "Defender";
    Position["Midfielder"] = "Midfielder";
    Position["Forward"] = "Forward";
})(Position || (Position = {}));
let Player = class Player extends BaseEntity {
    id;
    name;
    position;
    jerseyNumber;
    age;
    avatarUrl;
    nationality;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Player.prototype, "id", void 0);
__decorate([
    Column({
        type: "varchar",
        length: 50,
    }),
    __metadata("design:type", String)
], Player.prototype, "name", void 0);
__decorate([
    Column({
        type: "enum",
        enum: ["Goalkeeper", "Defender", "Midfielder", "Forward"],
    }),
    __metadata("design:type", String)
], Player.prototype, "position", void 0);
__decorate([
    Column({ unique: true, type: "int" }),
    Min(1, { message: "Jersey number must be between 1 and 99" }),
    Max(99, { message: "Jersey number must be between 1 and 99" }),
    __metadata("design:type", Number)
], Player.prototype, "jerseyNumber", void 0);
__decorate([
    Column(),
    Min(15, { message: "Age must be at least 15" }),
    Max(50, { message: "Age must be at most 50" }),
    __metadata("design:type", Number)
], Player.prototype, "age", void 0);
__decorate([
    Column({
        type: "varchar",
        nullable: true,
    }),
    IsOptional(),
    IsUrl({}, { message: "Invalid URL format" }),
    __metadata("design:type", String)
], Player.prototype, "avatarUrl", void 0);
__decorate([
    Column({
        type: "varchar",
        nullable: true,
    }),
    __metadata("design:type", String)
], Player.prototype, "nationality", void 0);
Player = __decorate([
    Entity()
], Player);
export { Player };
//# sourceMappingURL=player.js.map