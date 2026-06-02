const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/services.json');

const readServices = () => {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
};

const saveServices = (services) => {
    fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(services, null, 2),
        'utf-8'
    );
};

router.get('/', (req, res) => {
    try {
        const services = readServices();
        res.json(services);
    } catch (e) {
        res.status(500).json({
            error: 'Не удалось загрузить услуги'
        });
    }
});

router.get('/:id', (req, res) => {
    try {
        const services = readServices();

        const service = services.find(
            item => item.id == req.params.id
        );

        if (!service) {
            return res.status(404).json({
                error: 'Услуга не найдена'
            });
        }

        res.json(service);

    } catch (e) {
        res.status(500).json({
            error: 'Ошибка сервера'
        });
    }
});

router.post('/:id/comments', (req, res) => {
    try {
        const services = readServices();

        const service = services.find(
            item => item.id == req.params.id
        );

        if (!service) {
            return res.status(404).json({
                error: 'Услуга не найдена'
            });
        }

        if (!service.comments) {
            service.comments = [];
        }

        const newComment = {
            id: Date.now(),
            author: req.body.author || 'Аноним',
            text: req.body.text,
            date: new Date().toISOString()
        };

        service.comments.push(newComment);

        saveServices(services);

        res.status(201).json(newComment);

    } catch (e) {
        res.status(500).json({
            error: 'Ошибка сервера'
        });
    }
});

module.exports = router;