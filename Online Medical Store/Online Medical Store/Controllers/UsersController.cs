using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Online_Medical_Store.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Online_Medical_Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly MedContext _context;

        public UsersController(MedContext context)
        {
            _context = context;
        }

        // GET: api/<UsersController>
        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> Getusers()
        {
            return await _context.users.ToListAsync();
        }

        // GET api/<UsersController>/5
        // GET api/USers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUsers(int id)
        {
            var users = await _context.users.FindAsync(id);

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }

        // POST api/<UsersController>
        // POST api/Users
        [HttpPost("{email}")]
        public async Task<ActionResult<Users>> GetUserbyEmail(string email)       
        {
            var users = await _context.users.Where(x => x.Email == email).ToListAsync();

            if (users.Count == 0)
            {
                return NotFound();
            }

            return users[0];
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsers(int id, Users users)
        {
            if (id != users.Id)
            {
                return BadRequest();
            }

            _context.Entry(users).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Users>> PostUsers(Users users)
        {
            _context.users.Add(users);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsers", new { id = users.Id }, users);
        }

        // DELETE api/<UsersController>/5
        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsers(int id)
        {
            var users = await _context.users.FindAsync(id);
            if (users == null)
            {
                return NotFound();
            }

            _context.users.Remove(users);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsersExists(int id)
        {
            return _context.users.Any(e => e.Id == id);
        }
    }
}
