    import config from "../../mailing.config.json";
    import sendMail from "${relativePathToEmailsDir}";
    
    // template imports
    ${templateImports}

    // preview imports
    ${previewImports}
    
    const previews = { ${previewConsts} };
    const templates = { ${templateModuleNames} };

    export { sendMail, config, templates, previews };
    const moduleManifest = { sendMail, templates, previews };
    export default moduleManifest;

