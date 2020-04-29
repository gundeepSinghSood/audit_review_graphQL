const User = require('../../models/user');
const Project = require('../../models/projects');

const getProjectByID = projectIDs => new Promise(resolve => {
  try {
    // console.log('====', projectIDs)
    const projects = Project.find({ _id: { $in: projectIDs }})
    projects.map(pro => {
      return pro.map(async singlePro => {
        const test =  {
          ...singlePro._doc,
          creator: await userById(singlePro.creator)
        }
        return test;
      })
    })
    
    resolve(projects);
  } catch (error) {
    throw error;
  }
})


const project = async projectIDs => {
  try {
    const projects = await Project.find({ _id: { $in: projectIDs }})
    projects.map(pro => {
      return {
        ...pro._doc,
        creator: user.bind(this, pro.creator)
        }
    })
    return projects;
  } catch (error) {
    throw err;
  }
}

const user = userId => {
  return User.findById(userId)
    .then(user => {
      return { 
        ...user._doc,
        relatedProjects: project.bind(this, user._doc.relatedProjects)
      }
    })
    .catch(err => {
      throw err;
    })
}

const userById = async id => {
  const obj = await User.find({_id: id});
  const test = obj[0];
  return obj[0]
}


exports.user = user;
exports.getProjectByID = getProjectByID;