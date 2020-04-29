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
          reviewerId: args.projectInput.reviewerObjectID,
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
          const userData = await User.findById(args.projectInput.creatorObjectID);
          const reviewerData = await User.findById(args.projectInput.reviewerObjectID);
          console.log(reviewerData)
          if(!userData) {
            // there is user present with same name
            throw new Error('user not found')
          }
          userData.relatedProjects.push(project);
          reviewerData.toBeReviewed.push(project);
          await userData.save();
          await reviewerData.save();
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
    getProjecByID: async (projectID) => {
      const projectArray = await Project.find({_id: projectID});
      if(!user) {
        throw new Error('user does not exist')
      }
      console.log(projectArray)
      return projectArray.map(project => {
          return transformProjects(project)
        });
    }
}