using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Mvc;
using Worker.Models;

namespace Worker.Controllers
{
    public class TaskController : ApiController
    {
        private WorkerEntities db = new WorkerEntities();
      
        [System.Web.Http.HttpGet]
        [ResponseType(typeof(Worker.Models.Task))]
        public async Task<IHttpActionResult> GetTask(int id)
        {
            Worker.Models.Task task = await db.Task.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            return Json(task);
        }
        // GET api/Task
        public IHttpActionResult GetTasks()
        {
            
            return Json(db.Task);
        }

        //// GET api/Task/5
        //[ResponseType(typeof(Worker.Models.Task))]
        //public async Task<IHttpActionResult> GetTask(int id)
        //{
        //    Worker.Models.Task task = await db.Task.FindAsync(id);
        //    if (task == null)
        //    {
        //        return NotFound();
        //    }

        //    return Json(task);
        //}

        // PUT api/Tasks/5
        public async Task<IHttpActionResult> PutTask(int id, Worker.Models.Task task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != task.Id)
            {
                return BadRequest();
            }

            db.Entry(task).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET api/Task/GetNewTask
        [ResponseType(typeof(Worker.Models.Task))]
        public IHttpActionResult GetNewTask()
        {
            return Json(new Worker.Models.Task());
        }


        // POST api/Tasks
        [ResponseType(typeof(Worker.Models.Task))]
        public async Task<IHttpActionResult> PostTask(Worker.Models.Task task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            task.Durability = 1;
            db.Task.Add(task);
            await db.SaveChangesAsync();

            return Json(task);
        }

        // DELETE api/Tasks/5
        [ResponseType(typeof(Worker.Models.Task))]
        public async Task<IHttpActionResult> DeleteTask(int id)
        {
            Worker.Models.Task task = await db.Task.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            db.Task.Remove(task);
            await db.SaveChangesAsync();

            return Ok(task);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TaskExists(int id)
        {
            return db.Task.Count(e => e.Id == id) > 0;
        }
    }
}