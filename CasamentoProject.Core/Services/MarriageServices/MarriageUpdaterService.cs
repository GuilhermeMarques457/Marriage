using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Domain.RepositoryContracts;
using CasamentoProject.Core.DTO.MarriageDTOs;
using CasamentoProject.Core.Error;
using CasamentoProject.Core.Helpers;
using CasamentoProject.Core.ServiceContracts.MarriageContracts;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.MarriageServices
{
    public class MarriageUpdaterService : IMarriageUpdaterService
    {
        private readonly IMarriageRepository _repository;

        public MarriageUpdaterService(IMarriageRepository repository)
        {
            _repository = repository;
        }



        public async Task<MarriageResponse?> UpdateMarriage(MarriageUpdateRequest Marriage)
        {
            if (Marriage == null)
                throw new ArgumentNullException(nameof(Marriage), "Casamento não informado");

            Marriage? existingMarriage = await _repository.GetMarriageById(Marriage.Id);

            if (existingMarriage == null)
                throw new NotFoundException(nameof(existingMarriage), "Casamento não encontrado");

            Marriage? updatedMarriage = await _repository.UpdateMarriage(Marriage.ToMarriage());

            if (updatedMarriage == null)
                throw new ValidationException("Casamento falhou ao ser atualizado");

            return updatedMarriage.ToMarriageResponse();
        }

        public async Task<MarriageResponse> AddMarriageImages(MarriageFilesRequest marriageFilesRequest, string? imagePathFolder)
        {
            var marriageId = marriageFilesRequest.Id;
            Marriage? Marriage = await _repository.GetMarriageById(marriageId);

            if (Marriage == null) 
                throw new NotFoundException(nameof(Marriage), "Casamento não encontrado");

            if (imagePathFolder == null) 
                throw new NotFoundException(nameof(imagePathFolder), "Pasta para armazenar imagem não encontrada");

            if (marriageFilesRequest.PhotoOfCouple != null) 
                Marriage.PhotoOfCouplePath = await ImageHelper.AddImage(marriageFilesRequest.PhotoOfCouple, imagePathFolder, "images/couples", marriageId);

            if (marriageFilesRequest.PhotoOfGroom != null)
                Marriage.PhotoOfGroomPath = await ImageHelper.AddImage(marriageFilesRequest.PhotoOfGroom, imagePathFolder, "images/grooms", marriageId);

            if (marriageFilesRequest.PhotoOfBride != null)
                Marriage.PhotoOfBridePath = await ImageHelper.AddImage(marriageFilesRequest.PhotoOfBride, imagePathFolder, "images/brides", marriageId);

            Marriage? MarriageUpdated = await _repository.UpdateMarriage(Marriage);

            if (MarriageUpdated == null)
                throw new NotFoundException(nameof(Marriage), "Casamento falhou ao ser atualizado");

            return MarriageUpdated.ToMarriageResponse();
            
           


        }
    }
}
