import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq'
import { Job } from 'bullmq'
import { LinkClicksRepository } from '@src/links/application/ports/link-clicks.repository'
import { LinkClick } from '@src/links/domain/link-click'

const CONCURRENCY = 1

@Processor('links', { concurrency: CONCURRENCY })
export class LinkClickQueueProcessor extends WorkerHost {
    constructor(private readonly linkClicksRepository: LinkClicksRepository) {
        super()
    }

    async process(job: Job<LinkClick, any, string>): Promise<any> {
        switch (job.name) {
            case 'saveLinkClick': {
                const linkClick: LinkClick = job.data

                await this.linkClicksRepository.create(linkClick)
                break
            }
            default: {
                throw new Error(`Unhandled job type: ${job.name}`)
            }
        }
    }

    @OnWorkerEvent('error')
    onError(job: Job) {
        throw new Error(`Job ${job.id} errored`)
    }

    // @OnWorkerEvent('active')
    // onActive(job: Job) {
    //     console.log(`Job ${job.id} is active`)
    // }

    // @OnWorkerEvent('failed')
    // onFailed(job: Job) {
    //     console.log(`Job ${job.id} failed`)
    // }
}
