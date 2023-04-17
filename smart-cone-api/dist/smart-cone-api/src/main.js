"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./App/app.module");
const environment_1 = require("../../field-trainer/field-trainer/src/environments/environment");
const cors = require("cors");
const file_logger_1 = require("./Logging/file-logger");
const constraints_interceptor_1 = require("./App/constraints.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.ApplicationModule, {
        logger: false,
    });
    app.useLogger(app.get(file_logger_1.FileLogger));
    app.use(cors());
    app.useGlobalInterceptors(new constraints_interceptor_1.ConstraintsInterceptor());
    await app.listen(parseInt(environment_1.environment.config.smartConeApiHttpPort, 10));
}
bootstrap();
//# sourceMappingURL=main.js.map