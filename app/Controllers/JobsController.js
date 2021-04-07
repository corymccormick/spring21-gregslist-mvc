import { ProxyState } from "../AppState.js";
import { jobsService } from "../Services/JobsService.js";


//Private
function _draw() {
  let jobs = ProxyState.jobs
  let template = ''
  jobs.forEach(job => {
    template += job.Template
  })
  document.getElementById('jobs').innerHTML = template
}

//Public
export default class JobsController {
  constructor() {
    ProxyState.on('jobs', _draw);

    // REVIEW
    // GET CARS ON LOAD
    this.getJobs()
  }

  async getJobs() {

    await jobsService.getJobs()

  }

  async createJob() {
    try {
      window.event.preventDefault()
      const form = window.event.target
      let newJob = {
        // @ts-ignore
        company: form.company.value,
        // @ts-ignore
        jobTitle: form.jobTitle.value,
        // @ts-ignore
        hours: form.hours.value,
        // @ts-ignore  this converts the string to a number
        rate: form.rate.value,
        // @ts-ignore
        description: form.description.value,
      }
      await jobsService.createJob(newJob)

      // @ts-ignore
      form.reset()

      $('#new-job-form').modal('hide')
    }
    catch (error) {
      console.error(error);
    }
  }
  deleteJob(id) {
    jobsService.deleteJob(id)
  }
}
