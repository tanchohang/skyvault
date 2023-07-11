export function fileUploadValidation(req) {
    //   if (req.body.project) {
    //     if (isProject(req.user_id, req.body.project)) {
    //       return null;
    //     } else return new Error('Project is invalid');
    //   } else {
    //     return new Error('Project field is required');
    //   }
    if (req.body.project === undefined) {
        return Error('Project field is required');
    }
    return null;
}
//# sourceMappingURL=fileUploadValidation.js.map