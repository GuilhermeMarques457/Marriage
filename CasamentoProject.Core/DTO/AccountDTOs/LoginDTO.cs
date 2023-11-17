using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.DTO.AccountDTOs
{
    public class LoginDTO
    {
        [Required(ErrorMessage = "Email é obrigatório")]
        [EmailAddress(ErrorMessage = "Email deve estar no formato correto")]
        public string? Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Senha é obrigatória")]
        public string? Password { get; set; } = string.Empty;

        public ResponseUser ToResponseUser()
        {
            return new ResponseUser { 
                Email = Email,
            };
        }
    }
}
