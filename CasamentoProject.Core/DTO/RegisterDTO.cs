using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.DTO
{
    public class RegisterDTO
    {
        [Required(ErrorMessage = "Nome é obrigatório")]
        public string? PersonName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email é obrigatório")]
        [EmailAddress(ErrorMessage = "Email deve estar no formato correto")]
        [Remote(action: "IsEmailAlreadyRegistered", controller: "Account", ErrorMessage = "Email ja está em uso")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Numero de telefone é obrigatório")]
        [RegularExpression("^[0-9]*$", ErrorMessage = "Phone should have just digits")]
        public string? PhoneNumber { get; set; }

        [Required(ErrorMessage = "Senha é obrigatória")]
        public string? Password { get; set; }

        [Required(ErrorMessage = "Confirmar senha é obrigatório")]
        [Compare("Password", ErrorMessage = "Senha e comparar senha devem ser iguais")]
        public string? ConfirmPassword { get; set; }
    }
}
