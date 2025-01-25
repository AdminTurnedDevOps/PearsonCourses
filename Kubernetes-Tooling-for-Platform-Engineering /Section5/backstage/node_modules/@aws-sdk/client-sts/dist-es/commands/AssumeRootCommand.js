import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { AssumeRootResponseFilterSensitiveLog } from "../models/models_0";
import { de_AssumeRootCommand, se_AssumeRootCommand } from "../protocols/Aws_query";
export { $Command };
export class AssumeRootCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("AWSSecurityTokenServiceV20110615", "AssumeRoot", {})
    .n("STSClient", "AssumeRootCommand")
    .f(void 0, AssumeRootResponseFilterSensitiveLog)
    .ser(se_AssumeRootCommand)
    .de(de_AssumeRootCommand)
    .build() {
}
