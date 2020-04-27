const Project = require('../../models/projects');
const User = require('../../models/user');
const {user} = require('./common');


const transformProjects = project => {
  return {
    ...project._doc,
    // .populate('creator')
    creator: user.bind(this, project._doc.creator)
  };
}

module.exports = {
      createProject: async (args) => {
      const project = new Project({
          creator: args.projectInput.creatorObjectID,
          basicInput: {
            reviewerEmail: args.projectInput.basicInput.reviewerEmail,
            reviewerName: args.projectInput.basicInput.reviewerName,
            createdDate: args.projectInput.basicInput.createdDate,
            projectName: args.projectInput.basicInput.projectName,
            clientName: args.projectInput.basicInput.clientName,
            phoneNumber: args.projectInput.basicInput.phoneNumber
          }
      });
      let createdProject;
      try {
        const res = await project.save()
          createdProject = {
            ...res._doc,
            creator: user.bind(this, res._doc.creator)
            };
          const userData = await User.findById(args.projectInput.creatorObjectID)
          if(!userData) {
            // there is user present with same name
            throw new Error('user not found')
          }
          userData.relatedProjects.push(project);
          await userData.save()
          return createdProject;
        } catch (err) {
          throw err
        };
      return project;
    },
    
    project: async () => {
       try {
        const pro = await Project.find();
        return pro.map(project => {
          return transformProjects(project)
        });
       } catch (error) {
          throw err;
        }
    },
}